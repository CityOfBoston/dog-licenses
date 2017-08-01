// @flow

import React from 'react';
import Head from 'next/head';
import type { Context } from 'next';
import type { ClientDependencies } from '../page';
import type { DogLicenseSearchResults } from '../types';

import SearchResult from './search/SearchResult';

const COLORS = {
  Unknown: 'Unknown',
  OTHER: 'OTHER',
  AGOUTI: 'AGOUTI',
  APRICOT: 'APRICOT',
  'BL BRINDLE': 'BL BRINDLE',
  BLACK: 'BLACK',
  'BLK SMOKE': 'BLK SMOKE',
  BLUE: 'BLUE',
  'BLUE MERLE': 'BLUE MERLE',
  'BLUE PT': 'BLUE PT',
  'BLUE TICK': 'BLUE TICK',
  'BLUE TIGER': 'BLUE TIGER',
  'BR BRINDLE': 'BR BRINDLE',
  'BRN MERLE': 'BRN MERLE',
  BROWN: 'BROWN',
  BUFF: 'BUFF',
  CHOCOLATE: 'CHOCOLATE',
  CREAM: 'CREAM',
  FAWN: 'FAWN',
  GOLD: 'GOLD',
  GRAY: 'GRAY',
  GREEN: 'GREEN',
  'LILAC PT': 'LILAC PT',
  LIVER: 'LIVER',
  'LIVER TICK': 'LIVER TICK',
  ORANGE: 'ORANGE',
  'ORANGE TIGER': 'ORANGE TIGER',
  PINK: 'PINK',
  PURPLE: 'PURPLE',
  RED: 'RED',
  'RED MERLE': 'RED MERLE',
  'RED TICK': 'RED TICK',
  MUDDLE: 'MUDDLE',
  SABLE: 'SABLE',
  'SEAL PT': 'SEAL PT',
  SILVER: 'SILVER',
  TAN: 'TAN',
  TORTIE: 'TORTIE',
  TRICOLOR: 'TRICOLOR',
  WHITE: 'WHITE',
  'Y BRINDLE': 'Y BRINDLE',
  YELLOW: 'YELLOW',
};

const BREEDS = {
  'BOYKIN SPAN': 'BOYKIN SPAN',
  'CAIRN TERRIER': 'CAIRN TERRIER',
  UNKNOWN: 'UNKNOWN',
  'BULL TERRIER': 'BULL TERRIER',
  BEAUCERON: 'BEAUCERON',
  'BELG MALINOIS': 'BELG MALINOIS',
  'IBIZAN HOUND': 'IBIZAN HOUND',
  'FRENCH BULLDOG': 'FRENCH BULLDOG',
  'QUEENSLAND HEEL': 'QUEENSLAND HEEL',
  BENGAL: 'BENGAL',
  'GERM SH POINT': 'GERM SH POINT',
  'KARELIAN BEAR': 'KARELIAN BEAR',
  'ENG BULLDOG': 'ENG BULLDOG',
  LANDSEER: 'LANDSEER',
  VIZSLA: 'VIZSLA',
  'COCKER SPAN': 'COCKER SPAN',
  'SCHNAUZER MIN': 'SCHNAUZER MIN',
  'MEX HAIRLESS': 'MEX HAIRLESS',
  'ITAL GREYHOUND': 'ITAL GREYHOUND',
  'PORT WATER DOG': 'PORT WATER DOG',
  'SEALYHAM TERR': 'SEALYHAM TERR',
  'ST BERNARD SMTH': 'ST BERNARD SMTH',
  'PLOTT HOUND': 'PLOTT HOUND',
  OTTERHOUND: 'OTTERHOUND',
  'SHETLD SHEEPDOG': 'SHETLD SHEEPDOG',
  'FOX TERR WIRE': 'FOX TERR WIRE',
  BRIARD: 'BRIARD',
  'NORWICH TERRIER': 'NORWICH TERRIER',
  GREYHOUND: 'GREYHOUND',
  'CAVALIER SPAN': 'CAVALIER SPAN',
  'GERM SHEPHERD': 'GERM SHEPHERD',
  'SPAN WATER DOG': 'SPAN WATER DOG',
  'WH PT GRIFFON': 'WH PT GRIFFON',
  'LHASA APSO': 'LHASA APSO',
  'MANCHESTER TERR': 'MANCHESTER TERR',
  'RAT TERRIER': 'RAT TERRIER',
  'CHESA BAY RETR': 'CHESA BAY RETR',
  'SCHNAUZER GIANT': 'SCHNAUZER GIANT',
  'BLUETICK HOUND': 'BLUETICK HOUND',
  AKITA: 'AKITA',
  HARRIER: 'HARRIER',
  'PHARAOH HOUND': 'PHARAOH HOUND',
  'AMER BULLDOG': 'AMER BULLDOG',
  'SHIBA INU': 'SHIBA INU',
  'GORDON SETTER': 'GORDON SETTER',
  'COLLIE SMOOTH': 'COLLIE SMOOTH',
  'AMER ESKIMO': 'AMER ESKIMO',
  'ENG SPRNGR SPAN': 'ENG SPRNGR SPAN',
  BULLMASTIFF: 'BULLMASTIFF',
  LOWCHEN: 'LOWCHEN',
  'SPINONE ITAL': 'SPINONE ITAL',
  'MAINE COON': 'MAINE COON',
  'GREAT DANE': 'GREAT DANE',
  'BRUSS GRIFFON': 'BRUSS GRIFFON',
  MALTESE: 'MALTESE',
  'WEST HIGHLAND': 'WEST HIGHLAND',
  'TR WALKER HOUND': 'TR WALKER HOUND',
  TOSA: 'TOSA',
  'AMER FOXHOUND': 'AMER FOXHOUND',
  'TIBETAN SPAN': 'TIBETAN SPAN',
  PAPILLON: 'PAPILLON',
  RAGDOLL: 'RAGDOLL',
  'OLD ENG BULLDOG': 'OLD ENG BULLDOG',
  LEONBERGER: 'LEONBERGER',
  'GR SWISS MTN': 'GR SWISS MTN',
  'DUTCH SHEEPDOG': 'DUTCH SHEEPDOG',
  'BICHON FRISE': 'BICHON FRISE',
  'TIBETAN MASTIFF': 'TIBETAN MASTIFF',
  HAVANESE: 'HAVANESE',
  'MIN PINSCHER': 'MIN PINSCHER',
  'DOMESTIC LH': 'DOMESTIC LH',
  HIMALAYAN: 'HIMALAYAN',
  'POODLE STND': 'POODLE STND',
  'FOX TERR SMOOTH': 'FOX TERR SMOOTH',
  'DOGUE DE BORDX': 'DOGUE DE BORDX',
  'LABRADOR RETR': 'LABRADOR RETR',
  'NS DUCK TOLLING': 'NS DUCK TOLLING',
  'BELG TERVUREN': 'BELG TERVUREN',
  'WELSH TERRIER': 'WELSH TERRIER',
  'JAPANESE CHIN': 'JAPANESE CHIN',
  HOVAWART: 'HOVAWART',
  'IRISH WATR SPAN': 'IRISH WATR SPAN',
  'BLACK/TAN HOUND': 'BLACK/TAN HOUND',
  BRITTANY: 'BRITTANY',
  'SILKY TERRIER': 'SILKY TERRIER',
  STAFFORDSHIRE: 'STAFFORDSHIRE',
  'SIBERIAN HUSKY': 'SIBERIAN HUSKY',
  'CHIHUAHUA LH': 'CHIHUAHUA LH',
  'BULL TERR MIN': 'BULL TERR MIN',
  ROTTWEILER: 'ROTTWEILER',
  'AMERICAN STAFF': 'AMERICAN STAFF',
  'BL RUSSIAN TER': 'BL RUSSIAN TER',
  KUVASZ: 'KUVASZ',
  'KERRY BLUE TERR': 'KERRY BLUE TERR',
  BASENJI: 'BASENJI',
  'PIT BULL': 'PIT BULL',
  POMERANIAN: 'POMERANIAN',
  'SUSSEX SPAN': 'SUSSEX SPAN',
  BAT: 'BAT',
  'ALASK KLEE KAI': 'ALASK KLEE KAI',
  'NORW ELKHOUND': 'NORW ELKHOUND',
  CONURE: 'CONURE',
  BEAGLE: 'BEAGLE',
  'ENG COCKER SPAN': 'ENG COCKER SPAN',
  'POODLE TOY': 'POODLE TOY',
  'ENG POINTER': 'ENG POINTER',
  'ENG FOXHOUND': 'ENG FOXHOUND',
  SIAMESE: 'SIAMESE',
  'BASSET HOUND': 'BASSET HOUND',
  'IRISH TERRIER': 'IRISH TERRIER',
  'SCOT TERRIER': 'SCOT TERRIER',
  'DACHSHUND LH': 'DACHSHUND LH',
  'DUTCH SHEPHERD': 'DUTCH SHEPHERD',
  BORZOI: 'BORZOI',
  'AMER SH': 'AMER SH',
  'ALASKAN HUSKY': 'ALASKAN HUSKY',
  'ALASK MALAMUTE': 'ALASK MALAMUTE',
  'BELG SHEEPDOG': 'BELG SHEEPDOG',
  'SC WHEAT TERR': 'SC WHEAT TERR',
  'IRISH SETTER': 'IRISH SETTER',
  'ENG SETTER': 'ENG SETTER',
  'GLEN OF IMAAL': 'GLEN OF IMAAL',
  KOMONDOR: 'KOMONDOR',
  'POODLE MIN': 'POODLE MIN',
  'BEDLINGTON TERR': 'BEDLINGTON TERR',
  'SCOTTISH FOLD': 'SCOTTISH FOLD',
  'BOUV FLANDRES': 'BOUV FLANDRES',
  'GERM WH POINT': 'GERM WH POINT',
  'FIELD SPANIEL': 'FIELD SPANIEL',
  'CHINESE CRESTED': 'CHINESE CRESTED',
  'AM PIT BULL TER': 'AM PIT BULL TER',
  PUG: 'PUG',
  AFFENPINSCHER: 'AFFENPINSCHER',
  'WELSH SPR SPAN': 'WELSH SPR SPAN',
  'BLACK MOUTH CUR': 'BLACK MOUTH CUR',
  'SHIH TZU': 'SHIH TZU',
  BULLDOG: 'BULLDOG',
  'SCHNAUZER STAND': 'SCHNAUZER STAND',
  AKBASH: 'AKBASH',
  FEIST: 'FEIST',
  POINTER: 'POINTER',
  'SWED VALLHUND': 'SWED VALLHUND',
  'ENG TOY SPANIEL': 'ENG TOY SPANIEL',
  'DACHSHUND WH': 'DACHSHUND WH',
  'PATTERDALE TERR': 'PATTERDALE TERR',
  'REDBONE HOUND': 'REDBONE HOUND',
  BLOODHOUND: 'BLOODHOUND',
  BOERBOEL: 'BOERBOEL',
  'ENG COONHOUND': 'ENG COONHOUND',
  'WELSH CORGI CAR': 'WELSH CORGI CAR',
  'RUSSIAN BLUE': 'RUSSIAN BLUE',
  'POLISH LOWLAND': 'POLISH LOWLAND',
  'DOMESTIC MH': 'DOMESTIC MH',
  JINDO: 'JINDO',
  'SWISS HOUND': 'SWISS HOUND',
  'LAKELAND TERR': 'LAKELAND TERR',
  'RHOD RIDGEBACK': 'RHOD RIDGEBACK',
  'BORDER COLLIE': 'BORDER COLLIE',
  'COTON DE TULEAR': 'COTON DE TULEAR',
  'TOY FOX TERRIER': 'TOY FOX TERRIER',
  'AIREDALE TERR': 'AIREDALE TERR',
  'SCOT DEERHOUND': 'SCOT DEERHOUND',
  SALUKI: 'SALUKI',
  'FLAT COAT RETR': 'FLAT COAT RETR',
  SAMOYED: 'SAMOYED',
  BOXER: 'BOXER',
  'CAROLINA DOG': 'CAROLINA DOG',
  PBGV: 'PBGV',
  'PARSON RUSS TER': 'PARSON RUSS TER',
  GBGV: 'GBGV',
  PERSIAN: 'PERSIAN',
  'ST BERNARD RGH': 'ST BERNARD RGH',
  'NORFOLK TERRIER': 'NORFOLK TERRIER',
  DACHSHUND: 'DACHSHUND',
  'ENG SHEPHERD': 'ENG SHEPHERD',
  'TREEING CUR': 'TREEING CUR',
  'DOBERMAN PINSCH': 'DOBERMAN PINSCH',
  'AUST TERRIER': 'AUST TERRIER',
  MASTIFF: 'MASTIFF',
  'AUST CATTLE DOG': 'AUST CATTLE DOG',
  'GOLDEN RETR': 'GOLDEN RETR',
  'BERNESE MTN DOG': 'BERNESE MTN DOG',
  SCHIPPERKE: 'SCHIPPERKE',
  'FINNISH SPITZ': 'FINNISH SPITZ',
  'AUST SHEPHERD': 'AUST SHEPHERD',
  'IRISH WOLFHOUND': 'IRISH WOLFHOUND',
  'BORDER TERRIER': 'BORDER TERRIER',
  'AFGHAN HOUND': 'AFGHAN HOUND',
  'BEARDED COLLIE': 'BEARDED COLLIE',
  NEWFOUNDLAND: 'NEWFOUNDLAND',
  'COLLIE ROUGH': 'COLLIE ROUGH',
  'TENN TR BRINDLE': 'TENN TR BRINDLE',
  'WELSH CORGI PEM': 'WELSH CORGI PEM',
  WEIMARANER: 'WEIMARANER',
  'GERMAN PINSCHER': 'GERMAN PINSCHER',
  'OLDENG SHEEPDOG': 'OLDENG SHEEPDOG',
  MUNSTERLANDER: 'MUNSTERLANDER',
  'DOGO ARGENTINO': 'DOGO ARGENTINO',
  PEKINGESE: 'PEKINGESE',
  'YORKSHIRE TERR': 'YORKSHIRE TERR',
  'AUST KELPIE': 'AUST KELPIE',
  'CHIHUAHUA SH': 'CHIHUAHUA SH',
  'CURLYCOAT RETR': 'CURLYCOAT RETR',
  WHIPPET: 'WHIPPET',
  'NORW BUHUND': 'NORW BUHUND',
  'DOMESTIC SH': 'DOMESTIC SH',
  'CLUMBER SPAN': 'CLUMBER SPAN',
  'PRESA CANARIO': 'PRESA CANARIO',
  ENTLEBUCHER: 'ENTLEBUCHER',
  'NEAPOLITAN MAST': 'NEAPOLITAN MAST',
  DALMATIAN: 'DALMATIAN',
  'CHINESE SHARPEI': 'CHINESE SHARPEI',
  'CANE CORSO': 'CANE CORSO',
  'GREAT PYRENEES': 'GREAT PYRENEES',
  'CHOW CHOW': 'CHOW CHOW',
  KEESHOND: 'KEESHOND',
  'BOSTON TERRIER': 'BOSTON TERRIER',
  'AMER WATER SPAN': 'AMER WATER SPAN',
  'DANDIE DINMONT': 'DANDIE DINMONT',
  CATAHOULA: 'CATAHOULA',
  'CANAAN DOG': 'CANAAN DOG',
  'TIBETAN TERR': 'TIBETAN TERR',
  EURASIER: 'EURASIER',
  'PODENGO PEQUENO': 'PODENGO PEQUENO',
  PULI: 'PULI',
  'ANATOL SHEPHERD': 'ANATOL SHEPHERD',
};

export type InitialProps = {|
  results: ?DogLicenseSearchResults,
|};

export type Props = {
  ...InitialProps,
};

type State = {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  address: string,
  apt: string,
  neighborhood: string,
  zip: string,
  dogName: string,
  ageYears: string,
  ageMonths: string,
  color: string,
  breed: string,
  sex: string,
  rabiesIssued: string,
  rabiesExpire: string,
  comments: string,
};

export default class IndexPage extends React.Component {
  props: Props;
  state: State;

  static async getInitialProps(
    ctx: Context<*>,
    { dogLicensesDao }: ClientDependencies,
  ): Promise<InitialProps> {
    const { query } = ctx;

    let results = null;

    if (query.firstName && query.lastName && query.dogName && query.year) {
      results = await dogLicensesDao.search(
        query.firstName,
        query.lastName,
        query.dogName,
        parseInt(query.year, 10),
      );
    }

    return {
      results,
    };
  }

  constructor(props: Props) {
    super(props);

    if (props.results && props.results.length) {
      const result = props.results[0];
      this.state = {
        firstName: result['firstName'] || '',
        lastName: result['lastName'] || '',
        phone: result['phone'] || '',
        email: result['email'] || '',
        address: result['address'] || '',
        apt: result['apt'] || '',
        neighborhood: result['neighborhood'] || '',
        zip: result['zip'] || '',
        dogName: result['dogName'] || '',
        ageYears: result['yearsOld'] || '',
        ageMonths: result['monthsOld'] || '',
        color: result['priColor'] || '',
        breed: result['priBreed'] || '',
        sex: result['sex'] || '',
        rabiesIssued: result['vacDate'] || '',
        rabiesExpire: result['vacExp'] || '',
        comments: '',
      };
    } else {
      this.state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        neighborhood: '',
        zip: '',
        dogName: '',
        ageYears: '',
        ageMonths: '',
        color: '',
        breed: '',
        sex: '',
        rabiesIssued: '',
        rabiesExpire: '',
        comments: '',
        apt: '',
      };
    }
  }

  handleInputChange = (ev: SyntheticInputEvent) => {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (ev: SyntheticInputEvent) => {
    ev.preventDefault();
  };

  render() {
    return (
      <div>
        <Head>
          <title>Boston.gov — Dog Licenses</title>
        </Head>

        <div className="p-a300">
          <div className="sh sh--b0">
            <h1 className="sh-title">License Your Dog</h1>
          </div>

          <form
            className="sf sf--md"
            acceptCharset="UTF-8"
            method="get"
            action="/dogs"
            onSubmit={this.handleSubmit}>
            <input name="utf8" type="hidden" value="✓" />

            <div className="txt">
              <label htmlFor="lookup-firstName" className="txt-l">
                Owner First Name
              </label>
              <input
                id="lookup-firstName"
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                placeholder="Emily"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-lastName" className="txt-l">
                Owner Last Name
              </label>
              <input
                id="lookup-lastName"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                placeholder="Elizabeth"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-phone" className="txt-l">
                Phone Number
              </label>
              <input
                id="lookup-phone"
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
                placeholder="111-222-3333"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-email" className="txt-l">Email</label>
              <input
                id="lookup-email"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="e.elizabeth@bigreddog.com"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-address" className="txt-l">
                Street Address
              </label>
              <input
                id="lookup-address"
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                placeholder="1 City Hall Square"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-apt" className="txt-l">
                Apt. #
              </label>
              <input
                id="lookup-apt"
                type="text"
                name="apt"
                value={this.state.apt}
                onChange={this.handleInputChange}
                placeholder="221B"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-zip" className="txt-l">Zip Code</label>
              <input
                id="lookup-zip"
                type="text"
                name="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
                placeholder="02116"
                className="txt-f"
              />
            </div>

            <div className="fs-c m-b300">
              <div className="sel">
                <label
                  htmlFor="lookup-neighborhood"
                  className="sel-l sel-l--mt000">
                  Neighborhood
                </label>
                <div className="sel-c sel-c--fw">
                  <select
                    name="neighborhood"
                    type="select"
                    onChange={this.handleInputChange}
                    value={this.state.neighborhood}
                    id="lookup-neighborhood"
                    className="sel-f">
                    <option value="ALLSTON">Allston</option>
                    <option value="BACK BAY">Back Bay</option>
                    <option value="BEACON HILL">Beacon Hill</option>
                    <option value="BOSTON">Boston</option>
                    <option value="BRIGHTON">Brighton</option>
                    <option value="CHARLESTON">Charleston</option>
                    <option value="DORCHESTER">Dorchester</option>
                    <option value="EAST BOSTON">East Boston</option>
                    <option value="HYDE PARK">Hyde Park</option>
                    <option value="JAMAICA PLAIN">Jamaica Plain</option>
                    <option value="MATTAPAN">Mattapan</option>
                    <option value="READVILLE">Readville</option>
                    <option value="ROSLINDALE">Roslindale</option>
                    <option value="ROXBURY">Roxbury</option>
                    <option value="SOUTH BOSTON">South Boston</option>
                    <option value="WEST ROXBURY">West Roxbury</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="txt">
              <label htmlFor="lookup-dogName" className="txt-l">Dog Name</label>
              <input
                id="lookup-dogName"
                type="text"
                name="dogName"
                value={this.state.dogName}
                onChange={this.handleInputChange}
                placeholder="Clifford"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-ageYears" className="txt-l">
                Dog Age (Years)
              </label>
              <input
                id="lookup-ageYears"
                type="text"
                name="ageYears"
                value={this.state.ageYears}
                onChange={this.handleInputChange}
                placeholder="2, 0.5, 17..."
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-ageMonths" className="txt-l">
                Dog Age (Months)
              </label>
              <input
                id="lookup-ageMonths"
                type="text"
                name="ageMonths"
                value={this.state.ageMonths}
                onChange={this.handleInputChange}
                placeholder="2, 0.5, 17..."
                className="txt-f"
              />
            </div>

            <div className="fs-c m-b300">
              <div className="sel">
                <label htmlFor="lookup-breed" className="sel-l sel-l--mt000">
                  Primary Breed
                </label>
                <div className="sel-c sel-c--fw">
                  {this.renderBreedSelect()}
                </div>
              </div>
            </div>

            <div className="fs-c m-b300">
              <div className="sel">
                <label htmlFor="lookup-bolor" className="sel-l sel-l--mt000">
                  Primary Color
                </label>
                <div className="sel-c sel-c--fw">
                  {this.renderColorSelect()}
                </div>
              </div>
            </div>

            <div className="fs-c m-b300">
              <div className="sel">
                <label htmlFor="lookup-sex" className="sel-l sel-l--mt000">
                  Sex
                </label>
                <div className="sel-c sel-c--fw">
                  <select
                    name="sex"
                    type="text"
                    id="lookup-sex"
                    onChange={this.handleInputChange}
                    value={this.state.sex}
                    className="sel-f">
                    <option value="Female">Spayed Female ($15)</option>
                    <option value="Female">Un-spayed Female ($30)</option>
                    <option value="Male">Neutered Male ($15)</option>
                    <option value="Male">Un-neutered Male ($30)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="txt">
              <label htmlFor="lookup-rabiesIssue" className="txt-l">
                Rabies Issue Date
              </label>
              <input
                id="lookup-rabiesIssue"
                type="text"
                name="rabiesIssued"
                value={this.state.rabiesIssued}
                onChange={this.handleInputChange}
                placeholder="02/18/2014"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-rabiesExpire" className="txt-l">
                Rabies Expiration Date
              </label>
              <input
                id="lookup-rabiesExpire"
                type="text"
                name="rabiesExpire"
                value={this.state.rabiesExpire}
                onChange={this.handleInputChange}
                placeholder="03/31/2017"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-comments" className="txt-l">
                Comments
              </label>
              <textarea
                id="lookup-comments"
                placeholder="My dog is a mutt, with breeds..."
                className="txt-f"
                rows="5"
              />
            </div>

            <button className="btn" type="submit">Payment</button>

          </form>
        </div>

        {/*results && this.renderResults(results)*/}
        <div />

      </div>
    );
  }

  renderResults(results: DogLicenseSearchResults) {
    // we want the query that was searched for
    // const start = 1 + (results.page - 1) * results.pageSize;
    // const end = Math.min(start + results.pageSize - 1, results.resultCount);

    return (
      <div>

        <div className="p-a300 b--w">
          <div className="t--sans tt-u" style={{ fontSize: 12 }}>
            Showing results:
          </div>
        </div>

        {results.map(license =>
          <SearchResult license={license} key={license.id} />,
        )}

        <div className="p-a300">
          Not finding what you’re looking for? Try refining your search or{' '}
          <a
            href="https://www.boston.gov/departments/registry/how-get-dog-license"
            style={{ fontStyle: 'italic' }}>
            request a dog license
          </a>.
        </div>
      </div>
    );
  }

  renderColorSelect() {
    const displayNames = Object.keys(COLORS);
    displayNames.sort();
    return (
      <select
        name="color"
        id="lookup-color"
        type="text"
        onChange={this.handleInputChange}
        value={this.state.color}
        className="sel-f">
        {displayNames.map(displayName =>
          <option value={COLORS[displayName]} key={displayName}>
            {displayName}
          </option>,
        )}
      </select>
    );
  }

  renderBreedSelect() {
    const displayNames = Object.keys(BREEDS);
    displayNames.sort();
    return (
      <select
        name="breed"
        id="lookup-breed"
        type="text"
        onChange={this.handleInputChange}
        value={this.state.breed}
        className="sel-f">
        {displayNames.map(displayName =>
          <option value={BREEDS[displayName]} key={displayName}>
            {displayName}
          </option>,
        )}
      </select>
    );
  }

  // renderPagination({ page, pageCount }: DogLicenseSearchResults) {
  //   const makeHref = (p: number) => `/dogs`;
  //   return <Pagination page={page} pageCount={pageCount} hrefFunc={makeHref} />;
  // }
}
