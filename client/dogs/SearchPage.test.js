// @flow
import React from 'react';
import renderer from 'react-test-renderer';

//import type { DogLicense, DogLicenseSearchResults } from '../types';
import DogLicensesDao from '../dao/DogLicensesDao';

import SearchPage from './SearchPage';
import type { InitialProps } from './SearchPage';
import // TYPICAL_LICENSE,
// PENDING_LICENSE,
// NO_DATE_LICENSE,
'../../fixtures/client/dog-licenses';

jest.mock('next/router');
jest.mock('../dao/DogLicensesDao');

// const TEST_DOG_LICENSES: DogLicense[] = [
//   TYPICAL_LICENSE,
//   PENDING_LICENSE,
//   NO_DATE_LICENSE,
// ];

// const TEST_SEARCH_RESULTS: DogLicenseSearchResults = {
//   id: 'A08392',
//   firstName: 'ALEX',
//   lastName: 'ABOUD',
//   dogName: 'LUCY',
//   year: 2016,
// };

const renderFromInitialProps = async (
  query: { [key: string]: string },
  dependencies: Object,
) => {
  // const cart = new Cart();

  const initialProps: InitialProps = await SearchPage.getInitialProps(
    ({
      query,
    }: any),
    dependencies,
  );

  return renderer.create(<SearchPage /*cart={cart} */ {...initialProps} />);
};

describe('rendering', () => {
  let dogLicensesDao;

  beforeEach(() => {
    dogLicensesDao = new DogLicensesDao((null: any));
  });

  it('shows empty search box', async () => {
    expect(
      (await renderFromInitialProps({}, { dogLicensesDao })).toJSON(),
    ).toMatchSnapshot();
  });

  // it('shows search results', async () => {
  //   dogLicensesDao.search.mockReturnValue(TEST_SEARCH_RESULTS);

  //   expect(
  //     (await renderFromInitialProps(
  //       { q: 'Monkey Joe' },
  //       { dogLicensesDao },
  //     )).toJSON(),
  //   ).toMatchSnapshot();
  //   expect(dogLicensesDao.search).toHaveBeenCalledWith('Monkey Joe', 1);
  // });
});
