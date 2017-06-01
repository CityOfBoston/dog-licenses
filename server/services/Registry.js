// @flow

import { ConnectionPool } from 'mssql';

import fs from 'fs';
import DataLoader from 'dataloader';

type DbResponse<R> = {|
  recordsets: Array<Array<R>>,
  recordset: Array<R>,
  output: Object,
  rowsAffected: Array<number>,
|};

export type DeathCertificate = {|
  CertificateID: number,
  'Registered Number': string,
  InOut: 'I' | '*' | '#',
  'Date of Death': ?string,
  'Decedent Name': string,
  'Last Name': string,
  'First Name': string,
  RegisteredYear: string,
  AgeOrDateOfBirth: string,
  Pending: number,
|};

export type DeathCertificateSearchResult = {|
  /* :: ...DeathCertificate, */
  ResultCount: number,
|};

const MAX_ID_LOOKUP_LENGTH = 1000;

export default class Registry {
  pool: ConnectionPool;
  lookupLoader: DataLoader<string, ?DeathCertificate>;

  constructor(pool: ConnectionPool) {
    this.pool = pool;
    this.lookupLoader = new DataLoader((keys: Array<string>) => this.lookupLoaderFetch(keys));
  }

  async search(name: string, page: number, pageSize: number): Promise<Array<DeathCertificateSearchResult>> {
    const resp: DbResponse<DeathCertificateSearchResult> = ((await this.pool.request()
      .input('searchFor', name)
      .input('pageNumber', page)
      .input('pageSize', pageSize)
      .execute('Registry.Death.sp_FindCertificatesWeb')): any);

    const { recordset } = resp;

    if (!recordset) {
      throw new Error('Recordset for search came back empty');
    }

    return recordset;
  }

  async lookup(id: string): Promise<?DeathCertificate> {
    return this.lookupLoader.load(id);
  }

  async lookupLoaderFetch(keys: Array<string>): Promise<Array<?DeathCertificate | Error>> {
    // The api can only take 1000 characters of keys at once. We probably won't
    // run into that issue but just in case we split up and parallelize.
    const keyStrings: Array<string> = [];
    let currentKeyString = '';

    keys.forEach((key) => {
      if (currentKeyString.length === 0) {
        currentKeyString = key;
      } else if (currentKeyString.length + key.length + 1 < MAX_ID_LOOKUP_LENGTH) {
        currentKeyString = `${currentKeyString},${key}`;
      } else {
        keyStrings.push(currentKeyString);
        currentKeyString = key;
      }
    });

    if (currentKeyString.length > 0) {
      keyStrings.push(currentKeyString);
    }

    const allResults: Array<Array<DeathCertificate>> = await Promise.all(keyStrings.map(async (keyString) => {
      const resp: DbResponse<DeathCertificate> = ((await this.pool.request()
        .input('idList', keyString)
        .execute('Registry.Death.sp_GetCertificatesWeb')): any);

      return resp.recordset;
    }));

    const idToCertificateMap: {[key: string]: DeathCertificate} = {};
    allResults.forEach((results) => {
      results.forEach((cert: DeathCertificate) => {
        idToCertificateMap[cert.CertificateID.toString()] = cert;
      });
    });

    return keys.map((k) => idToCertificateMap[k]);
  }
}

export class RegistryFactory {
  pool: ConnectionPool;

  constructor(pool: ConnectionPool) {
    this.pool = pool;
  }

  registry() {
    return new Registry(this.pool);
  }

  cleanup(): Promise<any> {
    return this.pool.close();
  }
}

export type MakeRegistryOptions = {|
  user: ?string,
  password: ?string,
  server: ?string,
  domain: ?string,
  database: ?string,
|}

export async function makeRegistryFactory({ user, password, server, domain, database }: MakeRegistryOptions): Promise<RegistryFactory> {
  if (!(user && password && server && domain && database)) {
    throw new Error('Missing some element of database configuration');
  }

  const pool = new ConnectionPool({
    user,
    password,
    server,
    domain,
    database,
    pool: {
      min: 1,
    },
    options: {
      encrypt: true,
    },
  });

  await pool.connect();

  return new RegistryFactory(pool);
}

export class FixtureRegistry {
  data: Array<DeathCertificateSearchResult>;

  constructor(data: Array<DeathCertificateSearchResult>) {
    this.data = data;
  }

  async search(query: string, page: number, pageSize: number): Promise<Array<DeathCertificateSearchResult>> {
    return this.data.slice(page * pageSize, (page + 1) * pageSize);
  }

  async lookup(id: string): Promise<?DeathCertificateSearchResult> {
    return this.data.find((res) => res.CertificateID.toString() === id);
  }
}

export function makeFixtureRegistryFactory(fixtureName: string): Promise<RegistryFactory> {
  return new Promise((resolve, reject) => {
    fs.readFile(fixtureName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const json = JSON.parse(data.toString('utf-8'));

          resolve(({
            registry() {
              return new FixtureRegistry(json);
            },

            cleanup() {
              return Promise.resolve(null);
            },
          }: any));
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}
