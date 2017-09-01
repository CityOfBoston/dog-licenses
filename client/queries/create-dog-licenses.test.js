// @flow

import type { DogLicenseCreateMutationVariables } from './graphql-types';
import DogLicenseCreateGraphql from './CreateDogLicenses.graphql';

import createDogLicenses from './create-dog-licenses';

test('createDogLicenses', async () => {
  const loopbackGraphql = jest.fn().mockReturnValue({
    dogLicenseCreate: {},
  });

  await createDogLicenses(loopbackGraphql, {
    address: '123 Fake St',
    ageMonths: '18',
    ageYears: '1.5',
    apt: 'test',
    breed: 'Pug',
    color: 'tan',
    comments: 'This is a comment',
    dogName: 'Rover',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Smith',
    neighborhood: 'Brighton',
    phone: '123-123-1234',
    rabiesExpire: '1/1/2017',
    rabiesIssued: '2/1/2017',
    sex: 'male',
    zip: '01010',
  });

  const queryVariables: DogLicenseCreateMutationVariables = {
    address: '123 Fake St',
    ageMonths: '18',
    ageYears: '1.5',
    apt: 'test',
    breed: 'Pug',
    color: 'tan',
    comments: 'This is a comment',
    dogName: 'Rover',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Smith',
    neighborhood: 'Brighton',
    phone: '123-123-1234',
    rabiesExpire: '1/1/2017',
    rabiesIssued: '2/1/2017',
    sex: 'male',
    zip: '01010',
  };

  expect(loopbackGraphql).toHaveBeenCalledWith(
    DogLicenseCreateGraphql,
    queryVariables,
  );
});
