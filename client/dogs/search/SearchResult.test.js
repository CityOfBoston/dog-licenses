// @flow

import React from 'react';
import renderer from 'react-test-renderer';

import {
  TYPICAL_LICENSE,
  PENDING_LICENSE,
  NO_DATE_LICENSE,
} from '../../../fixtures/client/dog-licenses';

import SearchResult from './SearchResult';

describe('rendering', () => {
  it('renders a typical license', () => {
    expect(
      renderer.create(<SearchResult license={TYPICAL_LICENSE} />).toJSON(),
    ).toMatchSnapshot();
  });

  it('renders a pending license', () => {
    expect(
      renderer.create(<SearchResult license={PENDING_LICENSE} />).toJSON(),
    ).toMatchSnapshot();
  });

  it('renders a license without a death date', () => {
    expect(
      renderer.create(<SearchResult license={NO_DATE_LICENSE} />).toJSON(),
    ).toMatchSnapshot();
  });
});
