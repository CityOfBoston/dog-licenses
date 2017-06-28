// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import fullPageDecorator from '../../storybook/full-page-decorator';
import CheckoutPage from './CheckoutPage';

import {
  TYPICAL_LICENSE,
  PENDING_LICENSE,
  NO_DATE_LICENSE,
} from '../../fixtures/client/dog-licenses';

import Cart from '../store/Cart';

function makeCart() {
  const cart = new Cart();

  cart.add(TYPICAL_LICENSE, 1);
  cart.add(PENDING_LICENSE, 3);
  cart.add(NO_DATE_LICENSE, 1);

  return cart;
}

storiesOf('CheckoutPage', module)
  .addDecorator(fullPageDecorator)
  .add('normal page', () => <CheckoutPage cart={makeCart()} />);
