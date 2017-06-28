// @flow

import { ConnectionPool } from 'mssql';
import type { ConnectionPoolConfig } from 'mssql';

import fs from 'fs';
import DataLoader from 'dataloader';

type DbResponse<R> = {|
  recordsets: Array<Array<R>>,
  recordset: Array<R>,
  output: Object,
  rowsAffected: Array<number>,
|};

export type DogLicense = {|
  LicenseID: number,
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

export type DogLicenseSearchResult = {|
  /* :: ...DogLicense, */
  ResultCount: number,
|};

const MAX_ID_LOOKUP_LENGTH = 1000;

// Converts a list of key strings into an array of comma-separated strings,
// each no longer than maxLength.
//
// E.g.: ["12345", "67890", "abcde"] => ["12345,67890", "abcde"]
export function splitKeys(
  maxLength: number,
  keys: Array<string>,
): Array<string> {
  const keyStrings: Array<string> = [];
  let currentKeyString = '';

  keys.forEach(key => {
    if (currentKeyString.length === 0) {
      currentKeyString = key;
    } else if (currentKeyString.length + key.length + 1 < maxLength) {
      currentKeyString = `${currentKeyString},${key}`;
    } else {
      keyStrings.push(currentKeyString);
      currentKeyString = key;
    }
  });

  if (currentKeyString.length > 0) {
    keyStrings.push(currentKeyString);
  }

  return keyStrings;
}

export default class Registry {
  pool: ConnectionPool;
  lookupLoader: DataLoader<string, ?DogLicense>;

  constructor(pool: ConnectionPool) {
    this.pool = pool;
    this.lookupLoader = new DataLoader((keys: Array<string>) =>
      this.lookupLoaderFetch(keys),
    );
  }

  async search(
    name: string,
    page: number,
    pageSize: number,
    startYear: ?string,
    endYear: ?string,
  ): Promise<Array<DogLicenseSearchResult>> {
    const resp: DbResponse<
      DogLicenseSearchResult,
    > = (await this.pool
      .request()
      .input('searchFor', name)
      .input('pageNumber', page)
      .input('pageSize', pageSize)
      .input('sortBy', 'dateOfDeath')
      .input('startYear', startYear)
      .input('endYear', endYear)
      .execute('Registry.Death.sp_FindLicensesWeb'): any);

    const { recordset } = resp;

    if (!recordset) {
      throw new Error('Recordset for search came back empty');
    }

    return recordset;
  }

  async lookup(id: string): Promise<?DogLicense> {
    return this.lookupLoader.load(id);
  }

  async lookupLoaderFetch(
    keys: Array<string>,
  ): Promise<Array<?DogLicense | Error>> {
    // The api can only take 1000 characters of keys at once. We probably won't
    // run into that issue but just in case we split up and parallelize.
    const keyStrings = splitKeys(MAX_ID_LOOKUP_LENGTH, keys);

    const allResults: Array<Array<DogLicense>> = await Promise.all(
      keyStrings.map(async keyString => {
        const resp: DbResponse<DogLicense> = (await this.pool
          .request()
          .input('idList', keyString)
          .execute('Registry.Death.sp_GetLicensesWeb'): any);

        return resp.recordset;
      }),
    );

    const idToLicenseMap: { [key: string]: DogLicense } = {};
    allResults.forEach(results => {
      results.forEach((cert: DogLicense) => {
        idToLicenseMap[cert.CertificateID.toString()] = cert;
      });
    });

    return keys.map(k => idToLicenseMap[k]);
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
|};

export async function makeRegistryFactory({
  user,
  password,
  server,
  domain,
  database,
}: MakeRegistryOptions): Promise<RegistryFactory> {
  if (!(user && password && server && database)) {
    throw new Error('Missing some element of database configuration');
  }

  const opts: ConnectionPoolConfig = {
    user,
    password,
    server,
    database,
    pool: {
      min: 1,
    },
    options: {
      encrypt: true,
    },
  };

  if (domain) {
    opts.domain = domain;
  }

  const pool = new ConnectionPool(opts);

  await pool.connect();

  return new RegistryFactory(pool);
}

export class FixtureRegistry {
  data: Array<DogLicenseSearchResult>;

  constructor(data: Array<DogLicenseSearchResult>) {
    this.data = data;
  }

  async search(
    query: string,
    page: number,
    pageSize: number,
  ): Promise<Array<DogLicenseSearchResult>> {
    return this.data.slice(page * pageSize, (page + 1) * pageSize);
  }

  async lookup(id: string): Promise<?DogLicenseSearchResult> {
    return this.data.find(res => res.LicenseID.toString() === id);
  }
}

export function makeFixtureRegistryFactory(
  fixtureName: string,
): Promise<RegistryFactory> {
  return new Promise((resolve, reject) => {
    fs.readFile(fixtureName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const json = JSON.parse(data.toString('utf-8'));

          resolve(
            ({
              registry() {
                return new FixtureRegistry(json);
              },

              cleanup() {
                return Promise.resolve(null);
              },
            }: any),
          );
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}
