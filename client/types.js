// @flow

import type {
  FetchDogLicensesQuery,
  SearchDogLicensesQuery,
} from './queries/graphql-types';

export type DogLicense = $ArrayElement<
  $PropertyType<
    $PropertyType<FetchDogLicensesQuery, 'dogLicenses'>,
    'licenses',
  >,
>;
export type DogLicenseSearchResults = $PropertyType<
  $PropertyType<SearchDogLicensesQuery, 'dogLicenses'>,
  'search',
>;
