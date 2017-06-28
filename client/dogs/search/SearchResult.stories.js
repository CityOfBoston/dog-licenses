// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SearchResult from './SearchResult';

import {
  TYPICAL_LICENSE,
  PENDING_LICENSE,
  NO_DATE_LICENSE,
} from '../../../fixtures/client/dog-licenses';

storiesOf('SearchResult', module)
  .add('typical license', () => <SearchResult license={TYPICAL_LICENSE} />)
  .add('pending license', () => <SearchResult license={PENDING_LICENSE} />)
  .add('license without death date', () =>
    <SearchResult license={NO_DATE_LICENSE} />,
  );
