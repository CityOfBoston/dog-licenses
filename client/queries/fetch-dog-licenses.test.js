// @flow

import type { FetchDogLicensesQueryVariables } from './graphql-types';
import FetchDogLicensesGraphql from './FetchDogLicenses.graphql';

import fetchDogLicenses from './fetch-dog-licenses';

test('fetchDogLicenses', async () => {
  const loopbackGraphql = jest.fn().mockReturnValue({
    dogLicenses: {
      licenses: [],
    },
  });

  await fetchDogLicenses(loopbackGraphql, ['000001']);

  const queryVariables: FetchDogLicensesQueryVariables = {
    ids: ['000001'],
  };

  expect(loopbackGraphql).toHaveBeenCalledWith(
    FetchDogLicensesGraphql,
    queryVariables,
  );
});
