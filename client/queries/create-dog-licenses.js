// @flow

import type { LoopbackGraphql } from '../loopback-graphql';

import type {
  DogLicenseCreateMutation,
  DogLicenseCreateMutationVariables,
} from './graphql-types';
import CreateDogLicenseGraphql from './CreateDogLicenses.graphql';

import type { DogLicenseCreateResults } from '../types';

// Search for dog licenses with a simple query
export default async function createDogLicenses(
  loopbackGraphql: LoopbackGraphql,
  queryVariables: DogLicenseCreateMutationVariables,
): Promise<DogLicenseCreateResults> {
  const response: DogLicenseCreateMutation = await loopbackGraphql(
    CreateDogLicenseGraphql,
    queryVariables,
  );
  return response.dogLicenseCreate.firstName;
}
