// @flow

import { resolvers } from './query';

describe('Query resolvers', () => {
  describe('dogLicenses', () => {
    it('returns an empty value', () => {
      expect(resolvers.Query.dogLicenses()).toEqual({});
    });
  });
});
