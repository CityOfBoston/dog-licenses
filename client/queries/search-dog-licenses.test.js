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

  await searchDogLicenses(loopbackGraphql, 'Monkey Joe', 1, '1988', null);

  const queryVariables: SearchDogLicensesQueryVariables = {
    query: 'Monkey Joe',
    page: 1,
    startYear: '1988',
    endYear: null,
  };

  expect(loopbackGraphql).toHaveBeenCalledWith(
    SearchDogLicensesGraphql,
    queryVariables,
  );
});
