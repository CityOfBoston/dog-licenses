// @flow

import type { SearchDogLicensesQuery } from './queries/graphql-types';

export type DogLicenseSearchResults = $PropertyType<
  $PropertyType<SearchDogLicensesQuery, 'dogLicenses'>,
  'search',
>;

export type DogLicense = $ArrayElement<DogLicenseSearchResults>;
