// @flow

import type { DogLicense } from '../../client/types';

export const TYPICAL_LICENSE: DogLicense = {
  id: '000002',
  firstName: 'Bruce',
  lastName: 'Banner',
  deathYear: '2016',
  deathDate: '3/4/2016',
  pending: false,
  age: '21 yrs.',
};

export const PENDING_LICENSE: DogLicense = {
  id: '000001',
  firstName: 'Logan',
  lastName: 'Howlett',
  deathYear: '2014',
  deathDate: '4/15/2014',
  pending: true,
  age: '44 yrs. 2 mos. 10 dys',
};

export const NO_DATE_LICENSE: DogLicense = {
  id: '000003',
  firstName: 'Monkey',
  lastName: 'Joe',
  deathYear: '2004',
  deathDate: null,
  pending: false,
  age: '6',
};
