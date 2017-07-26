// @flow

import type { SearchDogLicensesQueryVariables } from './graphql-types';
import SearchDogLicensesGraphql from './SearchDogLicenses.graphql';

import searchDogLicenses from './search-dog-licenses';

test('searchDogLicenses', async () => {
  const loopbackGraphql = jest.fn().mockReturnValue({
    dogLicenses: {
      search: [],
    },
  });

  await searchDogLicenses(loopbackGraphql, 'ALEX', 'SMITH', 'LUCY', 2016);

  const queryVariables: SearchDogLicensesQueryVariables = {
    firstName: 'ALEX',
    lastName: 'SMITH',
    dogName: 'LUCY',
    year: 2016,
  };

  expect(loopbackGraphql).toHaveBeenCalledWith(
    SearchDogLicensesGraphql,
    queryVariables,
  );
});
