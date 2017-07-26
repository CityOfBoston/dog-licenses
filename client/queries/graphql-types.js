/* @flow */
//  This file was automatically generated and should not be edited.

export type SearchDogLicensesQueryVariables = {|
  firstName: string,
  lastName: string,
  dogName: string,
  year: number,
|};

export type SearchDogLicensesQuery = {|
  dogLicenses: {|
    search: Array< {|
      firstName: ?string,
      lastName: ?string,
      dogName: ?string,
      id: string,
    |} >,
  |},
|};