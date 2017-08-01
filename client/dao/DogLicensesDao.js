// @flow

import type { LoopbackGraphql } from '../loopback-graphql';
import type { DogLicense } from '../types';

import searchDogLicenses from '../queries/search-dog-licenses';
import type { DogLicenseSearchResults } from '../types';

export type DogLicenseCache = { [id: string]: DogLicense };

export default class DogLicensesDao {
  loopbackGraphql: LoopbackGraphql;

  constructor(loopbackGraphql: LoopbackGraphql) {
    this.loopbackGraphql = loopbackGraphql;
  }
  async search(
    firstName: string,
    lastName: string,
    dogName: string,
    year: number,
  ): Promise<DogLicenseSearchResults> {
    const results = await searchDogLicenses(
      this.loopbackGraphql,
      firstName,
      lastName,
      dogName,
      year,
    );

    return results;
  }

  parseQuery(
    fullQuery: string,
  ): { query: string, startYear: ?string, endYear: ?string } {
    // match a 4-digit year, and optionally a second 4-digit year with a hypen or en-dash
    const yearRegexp = /(\d{4})\s*[-–]?\s*(\d{4})?/;

    let query;
    let startYear;
    let endYear;

    const match = fullQuery.match(yearRegexp);
    if (match) {
      query = fullQuery.replace(yearRegexp, '').trim();
      startYear = match[1];
      endYear = match[2] || match[1];
    } else {
      query = fullQuery;
      startYear = null;
      endYear = null;
    }

    return {
      query,
      startYear,
      endYear,
    };
  }
}
