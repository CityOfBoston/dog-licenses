// @flow

import type { Context } from './index';
import type {
  DogLicenseSearchResult,
  DogLicense as DbDogLicense,
} from '../services/Registry';

export const Schema = `
type DogLicense {
  id: String!,
  firstName: String!,
  lastName: String!,
  deathDate: String,
  deathYear: String!,
  pending: Boolean,
  age: String,
}

# Pages are 1-indexed to make the UI look better
type DogLicenseSearch {
  page: Int!,
  pageSize: Int!,
  pageCount: Int!,
  results: [DogLicense!]!,
  resultCount: Int!,
}

type DogLicenses {
  search(query: String!, page: Int, pageSize: Int, startYear: String, endYear: String): DogLicenseSearch!
  license(id: String!): DogLicense
  licenses(ids: [String!]!): [DogLicense]!
}
`;

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 500;

type SearchArgs = {
  query: string,
  page?: number,
  pageSize?: number,
  startYear?: string,
  endYear?: string,
};

type LicenseArgs = {
  id: string,
};

type LicensesArgs = {
  ids: string[],
};

type DogLicense = {
  id: string,
  firstName: string,
  lastName: string,
  deathDate: ?string,
  deathYear: string,
  pending: boolean,
  age: ?string,
};

type DogLicenseSearch = {
  page: number,
  pageSize: number,
  pageCount: number,
  results: DogLicense[],
  resultCount: number,
};

function searchResultToDogLicense(
  res: DogLicenseSearchResult | DbDogLicense,
): DogLicense {
  return {
    id: res.CertificateID.toString(),
    firstName: res['First Name'],
    lastName: res['Last Name'],
    deathDate: res['Date of Death'],
    deathYear: res.RegisteredYear,
    pending: !!res.Pending,
    age: res.AgeOrDateOfBirth.replace(/^0+/, '') || '0',
  };
}

export const resolvers = {
  DogLicenses: {
    search: async (
      root: mixed,
      { query, pageSize, page, startYear, endYear }: SearchArgs,
      { registry }: Context,
    ): Promise<DogLicenseSearch> => {
      const queryPageSize = Math.min(
        pageSize || DEFAULT_PAGE_SIZE,
        MAX_PAGE_SIZE,
      );
      const queryPage = (page || 1) - 1;

      const results: Array<DogLicenseSearchResult> = await registry.search(
        query,
        queryPage,
        queryPageSize,
        startYear,
        endYear,
      );

      const resultCount = results.length > 0 ? results[0].ResultCount : 0;
      const pageCount = Math.ceil(resultCount / queryPageSize);

      return {
        page: queryPage + 1,
        pageSize: queryPageSize,
        pageCount,
        resultCount,
        results: results.map(searchResultToDogLicense),
      };
    },
    license: async (
      root: mixed,
      { id }: LicenseArgs,
      { registry }: Context,
    ): Promise<?DogLicense> => {
      const res = await registry.lookup(id);

      if (res) {
        return searchResultToDogLicense(res);
      } else {
        return null;
      }
    },
    licenses: (
      root: mixed,
      { ids }: LicensesArgs,
      { registry }: Context,
    ): Promise<Array<?DogLicense>> =>
      Promise.all(
        ids.map(async id => {
          const res = await registry.lookup(id);
          if (res) {
            return searchResultToDogLicense(res);
          } else {
            return null;
          }
        }),
      ),
  },
};
