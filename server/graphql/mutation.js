// @flow

import type { DogLicenseCreateMutationVariables } from '../../client/queries/graphql-types';

export const Schema = `
type Mutation {
  dogLicenseCreate (
    address: String
    ageMonths: String
    ageYears: String
    apt: String
    breed: String
    color: String
    comments: String
    dogName: String
    email: String
    firstName: String!
    lastName: String!
    neighborhood: String
    phone: String
    rabiesExpire: String
    rabiesIssued: String
    sex: String
    zip: String
  ): DogLicense!
}
`;

export const resolvers = {
  Mutation: {
    dogLicenseCreate: (
      root: mixed,
      args: DogLicenseCreateMutationVariables,
    ) => {
      const firstName = args.firstName;
      return {
        firstName,
      };
    },
  },
};
