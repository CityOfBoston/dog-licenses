// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Cart from '../../store/Cart';
import {
  TYPICAL_LICENSE,
  PENDING_LICENSE,
  NO_DATE_LICENSE,
} from '../../../fixtures/client/dog-licenses';

import CheckoutItem from './CheckoutItem';

function makeProps(license) {
  const cart = new Cart();

  cart.add(license, 1);
  const item = cart.items[0];

  return {
    cart,
    item,
  };
}

storiesOf('CheckoutItem', module)
  .add('typical license', () =>
    <CheckoutItem {...makeProps(TYPICAL_LICENSE)} />,
  )
  .add('pending license', () =>
    <CheckoutItem {...makeProps(PENDING_LICENSE)} />,
  )
  .add('license without death date', () =>
    <CheckoutItem {...makeProps(NO_DATE_LICENSE)} />,
  );
