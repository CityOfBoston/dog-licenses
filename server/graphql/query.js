// @flow

export const Schema = `
type Query {
  dogLicenses: DogLicenses!
}
`;

export const resolvers = {
  Query: {
    dogLicenses: () => ({}),
  },
};
