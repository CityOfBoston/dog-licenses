// @flow

import type { LoopbackGraphql } from '../loopback-graphql';

import type {
  SearchDogLicensesQuery,
  SearchDogLicensesQueryVariables,
} from './graphql-types';
import SearchDogLicensesGraphql from './SearchDogLicenses.graphql';

import type { DogLicenseSearchResults } from '../types';

// Search for dog licenses with a simple query
export default async function searchDogLicenses(
  loopbackGraphql: LoopbackGraphql,
  firstName: string,
  lastName: string,
  dogName: string,
  year: number,
): Promise<DogLicenseSearchResults> {
  const queryVariables: SearchDogLicensesQueryVariables = {
    firstName,
    lastName,
    dogName,
    year,
  };
  const response: SearchDogLicensesQuery = await loopbackGraphql(
    SearchDogLicensesGraphql,
    queryVariables,
  );
  return response.dogLicenses.search;
}
