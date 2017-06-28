// @flow

import { makeExecutableSchema } from 'graphql-tools';

import { Schema as QuerySchema, resolvers as queryResolvers } from './query';
import { Schema as DogSchema, resolvers as dogResolvers } from './dog-licenses';

import type Registry from '../services/Registry';

export type Context = {|
  registry: Registry,
|};

const SchemaDefinition = `
schema {
  query: Query,
}
`;

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, QuerySchema, DogSchema],
  resolvers: {
    ...queryResolvers,
    ...dogResolvers,
  },
  allowUndefinedInResolve: false,
});
