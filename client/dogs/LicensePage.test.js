// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Cart from '../store/Cart';
import DogLicensesDao from '../dao/DogLicensesDao';

import LicensePage from './LicensePage';
import type { InitialProps } from './LicensePage';

import { TYPICAL_LICENSE } from '../../fixtures/client/dog-licenses';

jest.mock('../dao/DogLicensesDao');

const renderFromInitialProps = async (
  query: { [key: string]: string },
  dependencies: Object,
) => {
  const cart = new Cart();
  const initialProps: InitialProps = await LicensePage.getInitialProps(
    ({
      query,
    }: any),
    dependencies,
  );

  return renderer.create(<LicensePage cart={cart} {...initialProps} />);
};

describe('rendering', () => {
  let dogLicensesDao;

  beforeEach(() => {
    dogLicensesDao = new DogLicensesDao((null: any));
  });

  it('renders a license', async () => {
    dogLicensesDao.get.mockReturnValue(TYPICAL_LICENSE);
    expect(
      (await renderFromInitialProps(
        { id: '000002' },
        { dogLicensesDao },
      )).toJSON(),
    ).toMatchSnapshot();
    expect(dogLicensesDao.get).toHaveBeenCalledWith('000002');
  });

  it('renders a 404', async () => {
    dogLicensesDao.get.mockReturnValue(null);

    expect(
      (await renderFromInitialProps(
        { id: '000002' },
        { dogLicensesDao },
      )).toJSON(),
    ).toMatchSnapshot();
    expect(dogLicensesDao.get).toHaveBeenCalledWith('000002');
  });
});

describe('searching', () => {
  it('redirects to search for a query', () => {
    const cart = new Cart();
    const wrapper = shallow(
      <LicensePage cart={cart} id="00002" license={TYPICAL_LICENSE} />,
    );

    wrapper
      .find('select[name="quantity"]')
      .simulate('change', { target: { value: '5' } });
    wrapper
      .find('form.js-add-to-cart-form')
      .simulate('submit', { preventDefault: jest.fn() });

    expect(cart.size).toEqual(5);
  });
});
