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

//should match SQL output
export type DogLicense = {|
  CertificateID: string,
  //Because of the joined tables in the sql search, some
  //columns are duplicated, resulting in array results.
  //We expect IDs to be the same because they are join columns.
  'userid': string[],
  'stamp': number[],
  'person_id': string[],
  'animal_id': string[],
  'sex': string[],
  'last_name': string,
  'first_name': string,
  'animal_name': string,
  'tag_date': number,
  'tag_no': string,
  'tag_type': string,
  'tag_date': number,
  'tag_exp': number,
  'tag_stat': string,
  'vac_date': number,
  'vac_term': number,
  'vac_exp': number,
  'jurisdiction': string,
  'tag_identity': number,
  'tag_tail': string,
  'clerk_id': string,
  'animal_name': string,
  'animal_type': string,
  'years_old': number,
  'months_old': number,
  'dob': number,
  'color_group': string,
  'primary_color': string,
  'secondary_color': string,
  'breed_group': string,
  'primary_breed': string,
  'secondary_breed': string,
  'animal_cond': string,
  'animal_stat': string,
  'status_date': number,
  'animal_size': string,
  'last_name': string,
  'first_name': string,
  'street_no': number,
  'street_name': string,
  'street_type': string,
  'apt': string,
  'city': string,
  'state': string,
  'zip_code': string,
  'phone_area_code': string,
  'phone_number': string,
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
    firstName: string,
    lastName: string,
    dogName: string,
    year: number,
  ): Promise<Array<DogLicenseSearchResult>> {
    const resp: DbResponse<
      DogLicenseSearchResult,
    > = (await this.pool
      .request()
      .input('dogName', dogName)
      .input('firstName', firstName)
      .input('lastName', lastName)
      .input('year', year)
      .query(
        `SELECT TOP (20) *
      FROM [Animal].[SYSADM].[tag] tag 
      JOIN [Animal].[SYSADM].[animal] animal 
      ON tag.animal_id = animal.animal_id 
      JOIN [Animal].[SYSADM].[person] person
      ON tag.person_id = person.person_id
      WHERE animal.animal_stat = 'ACTIVE'
      AND animal.animal_name = @dogName
      AND YEAR(tag.tag_date) = @year
      AND person.first_name = @firstName
      AND person.last_name = @lastName`,
      ): any);

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
          .execute('Fin.Death.sp_GetLicensesWeb'): any);

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

  // async search(
  //   lastName: string,
  //   firstName: string,
  // ): Promise<Array<DogLicenseSearchResult>> {
  //   return this.data.slice(page * pageSize, (page + 1) * pageSize);
  // }

  async lookup(id: string): Promise<?DogLicenseSearchResult> {
    return this.data.find(res => res.CertificateID.toString() === id);
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
