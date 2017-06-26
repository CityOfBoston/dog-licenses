// @flow
import React from 'react';
import renderer from 'react-test-renderer';

import type { DeathCertificate, DeathCertificateSearchResults } from '../types';
import Cart from '../store/Cart';
import DeathCertificatesDao from '../dao/DeathCertificatesDao';

import SearchPage from './SearchPage';
import type { InitialProps } from './SearchPage';
import {
  TYPICAL_CERTIFICATE,
  PENDING_CERTIFICATE,
  NO_DATE_CERTIFICATE,
} from '../../fixtures/client/death-certificates';

jest.mock('next/router');
jest.mock('../dao/DeathCertificatesDao');

const TEST_DEATH_CERTIFICATES: DeathCertificate[] = [
  TYPICAL_CERTIFICATE,
  PENDING_CERTIFICATE,
  NO_DATE_CERTIFICATE,
];

const TEST_SEARCH_RESULTS: DeathCertificateSearchResults = {
  results: TEST_DEATH_CERTIFICATES,
  resultCount: 50,
  page: 0,
  pageSize: 5,
  pageCount: 10,
};

const renderFromInitialProps = async (
  query: { [key: string]: string },
  dependencies: Object,
) => {
  const cart = new Cart();

  const initialProps: InitialProps = await SearchPage.getInitialProps(
    ({
      query,
    }: any),
    dependencies,
  );

  return renderer.create(<SearchPage cart={cart} {...initialProps} />);
};

describe('rendering', () => {
  let deathCertificatesDao;

  beforeEach(() => {
    deathCertificatesDao = new DeathCertificatesDao((null: any));
  });

  it('shows empty search box', async () => {
    expect(
      (await renderFromInitialProps({}, { deathCertificatesDao })).toJSON(),
    ).toMatchSnapshot();
  });

  it('shows search results', async () => {
    deathCertificatesDao.search.mockReturnValue(TEST_SEARCH_RESULTS);

    expect(
      (await renderFromInitialProps(
        { q: 'Monkey Joe' },
        { deathCertificatesDao },
      )).toJSON(),
    ).toMatchSnapshot();
    expect(deathCertificatesDao.search).toHaveBeenCalledWith('Monkey Joe', 1);
  });
});
