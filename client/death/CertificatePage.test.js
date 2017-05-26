// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import type { DeathCertificate } from '../types';
import Cart from '../store/Cart';
import DeathCertificatesDao from '../dao/DeathCertificatesDao';

import CertificatePage from './CertificatePage';
import type { InitialProps } from './CertificatePage';

jest.mock('../dao/DeathCertificatesDao');

const TEST_DEATH_CERTIFICATE: DeathCertificate = {
  id: '000002',
  firstName: 'Bruce',
  lastName: 'Banner',
  birthYear: '1962',
  deathYear: '2016',
  causeOfDeath: 'Hawkeye',
  age: '21 yrs.',
};

const renderFromInitialProps = async (query: {[key: string]: string}, dependencies: Object) => {
  const cart = new Cart();
  const initialProps: InitialProps = await CertificatePage.getInitialProps((({
    query,
  }): any), dependencies);

  return renderer.create(<CertificatePage cart={cart} {...initialProps} />);
};

describe('rendering', () => {
  let deathCertificatesDao;

  beforeEach(() => {
    deathCertificatesDao = new DeathCertificatesDao((null: any));
  });

  it('renders a certificate', async () => {
    deathCertificatesDao.get.mockReturnValue(TEST_DEATH_CERTIFICATE);
    expect((await renderFromInitialProps({ id: '000002' }, { deathCertificatesDao })).toJSON()).toMatchSnapshot();
    expect(deathCertificatesDao.get).toHaveBeenCalledWith('000002');
  });

  it('renders a 404', async () => {
    deathCertificatesDao.get.mockReturnValue(null);

    expect((await renderFromInitialProps({ id: '000002' }, { deathCertificatesDao })).toJSON()).toMatchSnapshot();
    expect(deathCertificatesDao.get).toHaveBeenCalledWith('000002');
  });
});

describe('searching', () => {
  it('redirects to search for a query', () => {
    const cart = new Cart();
    const wrapper = shallow(<CertificatePage cart={cart} id="00002" certificate={TEST_DEATH_CERTIFICATE} />);

    wrapper.find('select[name="quantity"]').simulate('change', { target: { value: '5' } });
    wrapper.find('form.js-add-to-cart-form').simulate('submit', { preventDefault: jest.fn() });

    expect(cart.size).toEqual(5);
  });
});
