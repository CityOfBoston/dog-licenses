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
      phone: ?string,
      sex: ?string,
      zip: ?string,
      address: ?string,
      monthsOld: ?string,
      yearsOld: ?string,
      priColor: ?string,
      priBreed: ?string,
      vacDate: ?string,
      vacExp: ?string,
      neighborhood: ?string,
      email: ?string,
      apt: ?string,
    |} >,
  |},
|};