// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import fullPageDecorator from '../../storybook/full-page-decorator';
import CheckoutPage from './CheckoutPage';

import type { DeathCertificate } from '../types';

import Cart from '../store/Cart';

const TEST_DEATH_CERTIFICATES: DeathCertificate[] = [
  {
    id: '000001',
    firstName: 'Logan',
    lastName: 'Howlett',
    birthYear: '1974',
    deathYear: '2014',
    causeOfDeath: 'Adamantium suffocation',
  },
  {
    id: '000002',
    firstName: 'Bruce',
    lastName: 'Banner',
    birthYear: '1962',
    deathYear: '2016',
    causeOfDeath: 'Hawkeye',
  },
];

function makeCart() {
  const cart = new Cart();

  cart.add(TEST_DEATH_CERTIFICATES[0], 1);
  cart.add(TEST_DEATH_CERTIFICATES[1], 3);

  return cart;
}

storiesOf('CheckoutPage', module)
  .addDecorator(fullPageDecorator)
  .add('normal page', () => (
    <CheckoutPage cart={makeCart()} />
  ));