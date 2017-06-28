// @flow

import React from 'react';
import { shallow } from 'enzyme';

import { CartItem } from '../../store/Cart';

import CheckoutItem from './CheckoutItem';
import { TYPICAL_LICENSE } from '../../../fixtures/client/dog-licenses';

describe('quantity field', () => {
  let item: CartItem;
  let cart;
  let wrapper;
  let quantityField;

  beforeEach(() => {
    item = new CartItem();
    item.id = TYPICAL_LICENSE.id;
    item.cert = TYPICAL_LICENSE;
    item.quantity = 4;

    cart = {
      setQuantity: jest.fn(),
      remove: jest.fn(),
    };

    wrapper = shallow(<CheckoutItem cart={(cart: any)} item={item} />);
    quantityField = wrapper.find('input');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('changes the quantity when a number is added', () => {
    quantityField.simulate('change', { target: { value: '5' } });
    expect(cart.setQuantity).toHaveBeenCalledWith(TYPICAL_LICENSE.id, 5);
  });

  it('ignores non-numeric values', () => {
    quantityField.simulate('change', { target: { value: 'abc' } });
    expect(cart.setQuantity).not.toHaveBeenCalled();
  });

  it('turns the item to 0 on clearing out', () => {
    quantityField.simulate('change', { target: { value: '' } });
    expect(cart.setQuantity).toHaveBeenCalledWith(TYPICAL_LICENSE.id, 0);
  });
});
