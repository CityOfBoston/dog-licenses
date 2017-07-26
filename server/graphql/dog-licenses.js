// @flow
import type { Context } from './index';
import type {
  DogLicenseSearchResult,
  DogLicense as DbDogLicense,
} from '../services/Registry';

export const Schema = `
type DogLicense {
  firstName: String,
  lastName: String,
  dogName: String,
  id: String!,
  personId: String!,
  tagNo: String,
  tagType: String,
  tagExp: Int,
  tagStat: String,
  vacDate: Int,
  vacTerm: Int,
  vacExp: Int,
  userId: String,
  stamp: Int,
  jurisdiction: String,
  tagIdentity: Int,
  tagTail: String,
  clerkid: String,
  animalType: String,
  sex: String,
  yearsOld: Int,
  monthsOld: Int,
  dob: Int,
  colorGroup: String,
  priColor: String,
  secColor: String,
  breedGroup: String,
  priBreed: String,
  secBreed: String,
  animalCond: String,
  animalStat: String,
  statusDate: Int,
  animalSize: String,
  streetNo: Int,
  streetName: String,
  streetType: String,
  apt: String,
  city: String,
  state: String,
  zipCode: String,
  areaCode: String,
  phone: String,
}

type DogLicenses {
  search(firstName: String!, lastName: String!, dogName: String!, year: Int!): [DogLicense!]!
  license(id: String!): DogLicense
  licenses(ids: [String!]!): [DogLicense]!
}
`;

type SearchArgs = {
  firstName: string,
  lastName: string,
  dogName: string,
  year: number,
};

type LicenseArgs = {
  id: string,
};

type LicensesArgs = {
  ids: string[],
};

//must match graphql schema above
type DogLicense = {
  firstName: string,
  lastName: string,
  dogName: string,
  id: string,
  personId: string,
  tagNo: string,
  tagType: string,
  tagExp: number,
  tagStat: string,
  vacDate: number,
  vacTerm: number,
  vacExp: number,
  userId: string,
  stamp: number,
  jurisdiction: string,
  tagIdentity: number,
  tagTail: string,
  clerkid: string,
  animalType: string,
  sex: string,
  yearsOld: number,
  monthsOld: number,
  dob: number,
  colorGroup: string,
  priColor: string,
  secColor: string,
  breedGroup: string,
  priBreed: string,
  secBreed: string,
  animalCond: string,
  animalStat: string,
  statusDate: number,
  animalSize: string,
  streetNo: number,
  streetName: string,
  streetType: string,
  apt: string, //?
  city: string,
  state: string,
  zipCode: string,
  areaCode: string,
  phone: string,
};

function searchResultToDogLicense(
  res: DogLicenseSearchResult | DbDogLicense,
): DogLicense {
  return {
    //Because of the joined tables in the sql search, some
    //columns are duplicated, resulting in array results.
    //We expect IDs to be the same because they are join columns.
    personId: res['person_id'][0],
    id: res['animal_id'][0],
    userId: res['userid'][0],
    //Value [0] is from the animal table for the two below
    stamp: res['stamp'][0],
    sex: res['sex'][0],
    lastName: res['last_name'],
    firstName: res['first_name'],
    dogName: res['animal_name'],
    tagNo: res['tag_no'],
    tagType: res['tag_type'],
    tagDate: res['tag_date'],
    tagExp: res['tag_exp'],
    tagStat: res['tag_stat'],
    vacDate: res['vac_date'],
    vacTerm: res['vac_term'],
    vacExp: res['vac_exp'],
    jurisdiction: res['jurisdiction'],
    tagIdentity: res['tag_identity'],
    tagTail: res['tag_tail'],
    clerkid: res['clerk_id'],
    animalType: res['animal_type'],
    yearsOld: res['years_old'],
    monthsOld: res['months_old'],
    dob: res['dob'],
    colorGroup: res['color_group'],
    priColor: res['primary_color'],
    secColor: res['secondary_color'],
    breedGroup: res['breed_group'],
    priBreed: res['primary_breed'],
    secBreed: res['secondary_breed'],
    animalCond: res['animal_cond'],
    animalStat: res['animal_stat'],
    statusDate: res['status_date'],
    animalSize: res['animal_size'],
    streetNo: res['street_no'],
    streetName: res['street_name'],
    streetType: res['street_type'],
    apt: res['apt'], //?
    city: res['city'],
    state: res['state'],
    zipCode: res['zip_code'],
    areaCode: res['phone_area_code'],
    phone: res['phone_number'],
  };
}

export const resolvers = {
  DogLicenses: {
    search: async (
      root: mixed,
      { firstName, lastName, dogName, year }: SearchArgs,
      { registry }: Context,
    ): Promise<DogLicense[]> => {
      const results: Array<DogLicenseSearchResult> = await registry.search(
        firstName,
        lastName,
        dogName,
        year,
      );
      return results.map(searchResultToDogLicense);
    },
    license: async (
      root: mixed,
      { id }: LicenseArgs,
      { registry }: Context,
    ): Promise<?DogLicense> => {
      const res = await registry.lookup(id);

      if (res) {
        return searchResultToDogLicense(res);
      } else {
        return null;
      }
    },
    licenses: (
      root: mixed,
      { ids }: LicensesArgs,
      { registry }: Context,
    ): Promise<Array<?DogLicense>> =>
      Promise.all(
        ids.map(async id => {
          const res = await registry.lookup(id);
          if (res) {
            return searchResultToDogLicense(res);
          } else {
            return null;
          }
        }),
      ),
  },
};
