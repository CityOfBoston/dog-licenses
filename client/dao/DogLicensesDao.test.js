// @flow

import DogLicensesDao from './DogLicensesDao';

import type { LoopbackGraphql } from '../loopback-graphql';
//import type { DogLicenseSearchResults } from '../types';

//import { TYPICAL_LICENSE } from '../../fixtures/client/dog-licenses';

// jest.mock('../queries/search-dog-licenses');
// const searchDogLicenses: JestMockFn = (require('../queries/search-dog-licenses'): any)
//   .default;

// const TEST_SEARCH_RESULTS: DogLicenseSearchResults = {
//   results: [TYPICAL_LICENSE],
// };

let loopbackGraphql: LoopbackGraphql;
let dao: DogLicensesDao;

beforeEach(() => {
  loopbackGraphql = jest.fn();
  dao = new DogLicensesDao(loopbackGraphql);
});

// describe('search', () => {
//   it('searches for the query string', async () => {
//     searchDogLicenses.mockReturnValue(Promise.resolve(TEST_SEARCH_RESULTS));

//     expect((await dao.search('Banner', 1)).results).toEqual([TYPICAL_LICENSE]);
//   });

//   it('primes the id cache', async () => {
//     searchDogLicenses.mockReturnValue(Promise.resolve(TEST_SEARCH_RESULTS));
//     await dao.search('Banner', 1);

//     expect(await dao.get(TYPICAL_LICENSE.id)).toEqual(TYPICAL_LICENSE);
//   });
// });

describe('parseQuery', () => {
  it('passes through query with no years', () => {
    expect(dao.parseQuery('jane doe')).toEqual({
      query: 'jane doe',
      startYear: null,
      endYear: null,
    });
  });

  it('uses one year as start and end', () => {
    expect(dao.parseQuery('jane doe 1966')).toEqual({
      query: 'jane doe',
      startYear: '1966',
      endYear: '1966',
    });
  });

  it('finds 2 years with an en-dash', () => {
    expect(dao.parseQuery('1966–2011 jane doe ')).toEqual({
      query: 'jane doe',
      startYear: '1966',
      endYear: '2011',
    });
  });
});
