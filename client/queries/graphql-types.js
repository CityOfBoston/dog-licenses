/* @flow */
//  This file was automatically generated and should not be edited.

export type DogLicenseCreateMutationVariables = {|
  address: string,
  ageMonths: string,
  ageYears: string,
  apt: string,
  breed: string,
  color: string,
  comments: string,
  dogName: string,
  email: string,
  firstName: string,
  lastName: string,
  neighborhood: string,
  phone: string,
  rabiesExpire: string,
  rabiesIssued: string,
  sex: string,
  zip: string,
|};

export type DogLicenseCreateMutation = {|
  dogLicenseCreate: {|
    firstName: ?string,
  |},
|};

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