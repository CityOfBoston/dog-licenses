// @flow

import type { SearchDogLicensesQuery } from './queries/graphql-types';
import type { DogLicenseCreateMutation } from './queries/graphql-types';

export type DogLicenseSearchResults = $PropertyType<
  $PropertyType<SearchDogLicensesQuery, 'dogLicenses'>,
  'search',
>;

export type DogLicenseCreateResults = $PropertyType<
  $PropertyType<DogLicenseCreateMutation, 'dogLicenseCreate'>,
  'firstName',
>;

export type DogLicense = $ArrayElement<DogLicenseSearchResults>;
