// @flow

import type { DogLicense } from '../types';
import type { LoopbackGraphql } from '../loopback-graphql';

import type {
  FetchDogLicensesQuery,
  FetchDogLicensesQueryVariables,
} from './graphql-types';
import FetchDogLicensesGraphql from './FetchDogLicenses.graphql';

// Look up a dog license by id
export default async function fetchDogLicenses(
  loopbackGraphql: LoopbackGraphql,
  ids: string[],
): Promise<Array<?DogLicense>> {
  const queryVariables: FetchDogLicensesQueryVariables = { ids };
  const response: FetchDogLicensesQuery = await loopbackGraphql(
    FetchDogLicensesGraphql,
    queryVariables,
  );
  // Returning "any" until https://github.com/apollographql/apollo-codegen/issues/122 is fixed
  return (response.dogLicenses.licenses: any);
}
