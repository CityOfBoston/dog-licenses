/* @flow */
//  This file was automatically generated and should not be edited.

export type FetchDogLicensesQueryVariables = {|
  ids: Array< string >,
|};

export type FetchDogLicensesQuery = {|
  dogLicenses: {|
    licenses: Array< {|
      id: string,
      firstName: string,
      lastName: string,
      deathYear: string,
      deathDate: ?string,
      pending: ?boolean,
      age: ?string,
    |} >,
  |},
|};

export type SearchDogLicensesQueryVariables = {|
  query: string,
  page: number,
  startYear: ?string,
  endYear: ?string,
|};

export type SearchDogLicensesQuery = {|
  dogLicenses: {|
    search: {|
      page: number,
      pageSize: number,
      pageCount: number,
      resultCount: number,
      results: Array< {|
        id: string,
        firstName: string,
        lastName: string,
        deathYear: string,
        deathDate: ?string,
        pending: ?boolean,
        age: ?string,
      |} >,
    |},
  |},
|};