// @flow

import React from 'react';
import Head from 'next/head';
import type { Context } from 'next';
import type { ClientDependencies } from '../page';
import type { DogLicenseSearchResults } from '../types';

import SearchResult from './search/SearchResult';

const COLORS = {
  Agouti: 'AGOUTI',
  Apricot: 'APRICOT',
  'Black Brindle': 'BL BRINDLE',
  Black: 'BLACK',
  'Black Smoke': 'BLK SMOKE',
  Blue: 'BLUE',
  'Blue Merle': 'BLUE MERLE',
  'Blue PT': 'BLUE PT',
  'Blue Tick': 'BLUE TICK',
  'Blue Tiger': 'BLUE TIGER',
  'Brown Brindle': 'BR BRINDLE',
  'Brown Merle': 'BRN MERLE',
  Brown: 'BROWN',
  Buff: 'BUFF',
  Chocolate: 'CHOCOLATE',
  Cream: 'CREAM',
  Fawn: 'FAWN',
  Gold: 'GOLD',
  Gray: 'GRAY',
  Green: 'GREEN',
  'Lilac PT': 'LILAC PT',
  Liver: 'LIVER',
  'Liver Tick': 'LIVER TICK',
  Orange: 'ORANGE',
  'Orange Tiger': 'ORANGE TIGER',
  Pink: 'PINK',
  Purple: 'PURPLE',
  Red: 'RED',
  'Red Merle': 'RED MERLE',
  'Red Tick': 'RED TICK',
  Muddle: 'MUDDLE',
  Sable: 'SABLE',
  'Seal PT': 'SEAL PT',
  Silver: 'SILVER',
  Tan: 'TAN',
  Tortie: 'TORTIE',
  Tricolor: 'TRICOLOR',
  White: 'WHITE',
  'Yellow Brindle': 'Y BRINDLE',
  Yellow: 'YELLOW',
};

const NEIGHBORHOODS = {
  Allston: 'ALLSTON',
  'Back Bay': 'BACK BAY',
  'BEACON HILL': 'Beacon Hill',
  Boston: 'BOSTON',
  Brighton: 'BRIGHTON',
  Charleston: 'CHARLESTON',
  Dorchester: 'DORCHESTER',
  'East Boston': 'EAST BOSTON',
  'Hyde Park': 'HYDE PARK',
  'Jamaica Plain': 'JAMAICA PLAIN',
  Mattapan: 'MATTAPAN',
  Readville: 'READVILLE',
  Roslindale: 'ROSLINDALE',
  Roxbury: 'ROXBURY',
  'South Boston': 'SOUTH BOSTON',
  'West Roxbury': 'WEST ROXBURY',
};

const BREEDS = {
  'Boykin Spaniel': 'BOYKIN SPAN',
  'Cairn Terrier': 'CAIRN TERRIER',
  'Bull Terrier': 'BULL TERRIER',
  Beauceron: 'BEAUCERON',
  'Belgian Malnois': 'BELG MALINOIS',
  'Ibizan Hound': 'IBIZAN HOUND',
  'French Bulldog': 'FRENCH BULLDOG',
  'Queensland Heel': 'QUEENSLAND HEEL',
  'German Shephard Point': 'GERM SH POINT',
  'Karelian Bear': 'KARELIAN BEAR',
  'English Bulldog': 'ENG BULLDOG',
  Landseer: 'LANDSEER',
  Vizla: 'VIZSLA',
  'Cocker Spaniel': 'COCKER SPAN',
  'Schnauzer (Miniature)': 'SCHNAUZER MIN',
  'Mexican Hairless': 'MEX HAIRLESS',
  'Italian Greyhound': 'ITAL GREYHOUND',
  'Portuguese Water Dog': 'PORT WATER DOG',
  'Sealyham Terrier': 'SEALYHAM TERR',
  'St. Bernard (SMTH)': 'ST BERNARD SMTH',
  'Plott Hound': 'PLOTT HOUND',
  Otterhound: 'OTTERHOUND',
  'Shetland Sheepdog': 'SHETLD SHEEPDOG',
  'Fox Terrier (Wire-haired)': 'FOX TERR WIRE',
  Briard: 'BRIARD',
  'Norwich Terrier': 'NORWICH TERRIER',
  Greyhound: 'GREYHOUND',
  'Cavalier Spaniel': 'CAVALIER SPAN',
  'German Shephard': 'GERM SHEPHERD',
  'Spanish Water Dog': 'SPAN WATER DOG',
  'Wire-haired Pointer Griffon': 'WH PT GRIFFON',
  'Lhasa Apso': 'LHASA APSO',
  'Manchester Terrier': 'MANCHESTER TERR',
  'Rat Terrier': 'RAT TERRIER',
  'Chesapeake Bay Retriever': 'CHESA BAY RETR',
  'Schnauzer (Giant)': 'SCHNAUZER GIANT',
  'Bluetick Hound': 'BLUETICK HOUND',
  Akita: 'AKITA',
  Harrier: 'HARRIER',
  'Pharoah Hound': 'PHARAOH HOUND',
  'American Bulldog': 'AMER BULLDOG',
  'Shiba Inu': 'SHIBA INU',
  'Gordon Setter': 'GORDON SETTER',
  'Collie (Smooth)': 'COLLIE SMOOTH',
  'American Eskimo': 'AMER ESKIMO',
  'English Springer Spaniel': 'ENG SPRNGR SPAN',
  Bullmastiff: 'BULLMASTIFF',
  Lowchen: 'LOWCHEN',
  'Italian Spinone': 'SPINONE ITAL',
  'Great Dane': 'GREAT DANE',
  'Bruss Griffon': 'BRUSS GRIFFON',
  Maltese: 'MALTESE',
  'West Highland': 'WEST HIGHLAND',
  'Treeing Walker Coonhound': 'TR WALKER HOUND',
  Tosa: 'TOSA',
  'American Foxhound': 'AMER FOXHOUND',
  'Tibetan Spaniel': 'TIBETAN SPAN',
  Papillion: 'PAPILLON',
  Ragdoll: 'RAGDOLL',
  'Old Enlish Bulldog': 'OLD ENG BULLDOG',
  Leonberger: 'LEONBERGER',
  'Greater Swiss Mountain': 'GR SWISS MTN',
  'Dutch Sheepdog': 'DUTCH SHEEPDOG',
  'Bichon Frise': 'BICHON FRISE',
  'Tibetan Mastiff': 'TIBETAN MASTIFF',
  Havanese: 'HAVANESE',
  'Mini Pinscher': 'MIN PINSCHER',
  Himalayan: 'HIMALAYAN',
  'Poodle (Standard)': 'POODLE STND',
  'Fox Terrier (Smooth)': 'FOX TERR SMOOTH',
  'Dogue de Bordeaux': 'DOGUE DE BORDX',
  'Labrador Retriever': 'LABRADOR RETR',
  'Nova Scotia Duck Tolling Retriever': 'NS DUCK TOLLING',
  'Belgian Tervuren': 'BELG TERVUREN',
  'Welsh Terrier': 'WELSH TERRIER',
  'Japanese Chin': 'JAPANESE CHIN',
  Hovaward: 'HOVAWART',
  'Irish Water Spaniel': 'IRISH WATR SPAN',
  'Hound (Black/Tan)': 'BLACK/TAN HOUND',
  Brittany: 'BRITTANY',
  'Silky Terrier': 'SILKY TERRIER',
  Staffordshire: 'STAFFORDSHIRE',
  'Siberian Husky': 'SIBERIAN HUSKY',
  'Chihuahua (Long-haired)': 'CHIHUAHUA LH',
  'Bull Terrier (Mini)': 'BULL TERR MIN',
  Rottweiler: 'ROTTWEILER',
  'American Staffordshire Terrier': 'AMERICAN STAFF',
  'Black Russian Terrier': 'BL RUSSIAN TER',
  Kuvasz: 'KUVASZ',
  'Kerry Blue Terrier': 'KERRY BLUE TERR',
  Basenji: 'BASENJI',
  'Pit Bull': 'PIT BULL',
  Pomeranian: 'POMERANIAN',
  'Sussex Spaniel': 'SUSSEX SPAN',
  Bat: 'BAT',
  'Alaskan Klee Kai': 'ALASK KLEE KAI',
  'Norweigan Elkhound': 'NORW ELKHOUND',
  Beagle: 'BEAGLE',
  'English Cocker Spaniel': 'ENG COCKER SPAN',
  'Poodle (Toy)': 'POODLE TOY',
  'English Pointer': 'ENG POINTER',
  'English Foxhound': 'ENG FOXHOUND',
  Siamese: 'SIAMESE',
  'Basset Hound': 'BASSET HOUND',
  'Irish Terrier': 'IRISH TERRIER',
  'Scottish Terrier': 'SCOT TERRIER',
  'Dachshund (Long-haired)': 'DACHSHUND LH',
  'Dutch Shepherd': 'DUTCH SHEPHERD',
  Borzoi: 'BORZOI',
  'American Shepherd': 'AMER SH',
  'Alaskan Husky': 'ALASKAN HUSKY',
  'Alaskan Malamute': 'ALASK MALAMUTE',
  'Belgian Sheepdog': 'BELG SHEEPDOG',
  'Soft Coated Wheaten Terrier': 'SC WHEAT TERR',
  'Irish Setter': 'IRISH SETTER',
  'English Setter': 'ENG SETTER',
  'Glen of Imaal Terrier': 'GLEN OF IMAAL',
  Komondor: 'KOMONDOR',
  'Poodle (Mini)': 'POODLE MIN',
  'Bedlington Terrier': 'BEDLINGTON TERR',
  'Bouvier Flandres': 'BOUV FLANDRES',
  'German Wire-haired Pointer': 'GERM WH POINT',
  'Field Spaniel': 'FIELD SPANIEL',
  'Chinese Crested': 'CHINESE CRESTED',
  'American Pit Bull Terrier': 'AM PIT BULL TER',
  Pug: 'PUG',
  Affenpinscher: 'AFFENPINSCHER',
  'Welsh Springer Spaniel': 'WELSH SPR SPAN',
  'Black Mouth Cur': 'BLACK MOUTH CUR',
  'Shih Tzu': 'SHIH TZU',
  Bulldog: 'BULLDOG',
  'Schnauzer (Standard)': 'SCHNAUZER STAND',
  Akbash: 'AKBASH',
  Feist: 'FEIST',
  Pointer: 'POINTER',
  'Swedish Vallhund': 'SWED VALLHUND',
  'English Toy Spaniel': 'ENG TOY SPANIEL',
  'Dachshund (Wire-haired)': 'DACHSHUND WH',
  'Patterdale Terrier': 'PATTERDALE TERR',
  'Redbone Hound': 'REDBONE HOUND',
  Bloodhound: 'BLOODHOUND',
  Boerboel: 'BOERBOEL',
  'English Coonhound': 'ENG COONHOUND',
  'Welsh Corgi (Cardigan)': 'WELSH CORGI CAR',
  'Polish Lowland': 'POLISH LOWLAND',
  Jindo: 'JINDO',
  'Swiss Hound': 'SWISS HOUND',
  'Lakeland Terrier': 'LAKELAND TERR',
  'Rhodesian Ridgeback': 'RHOD RIDGEBACK',
  'Border Collie': 'BORDER COLLIE',
  'Coton de Tulear': 'COTON DE TULEAR',
  'Fox Terrier (Toy)': 'TOY FOX TERRIER',
  'Airedale Terrier': 'AIREDALE TERR',
  'Scottish Deerhound': 'SCOT DEERHOUND',
  Saluki: 'SALUKI',
  'Flat Coat Retriever': 'FLAT COAT RETR',
  Samoyed: 'SAMOYED',
  Boxer: 'BOXER',
  'Carolina Dog': 'CAROLINA DOG',
  'Petit Basset Griffon Vendeen (PBGV)': 'PBGV',
  'Parson Russell Terrier': 'PARSON RUSS TER',
  'Grand Basset Griffon Vendeen (GBGV)': 'GBGV',
  'St. Bernard (RGH)': 'ST BERNARD RGH',
  'Norfolk Terrier': 'NORFOLK TERRIER',
  'Dachshund (Standard)': 'DACHSHUND',
  'English Shepherd': 'ENG SHEPHERD',
  'Treeing Cur': 'TREEING CUR',
  'Doberman Pinscher': 'DOBERMAN PINSCH',
  'Australian Terrier': 'AUST TERRIER',
  Mastiff: 'MASTIFF',
  'Australian Cattle Dog': 'AUST CATTLE DOG',
  'Golden Retriever': 'GOLDEN RETR',
  'Bernese Mountain Dog': 'BERNESE MTN DOG',
  Schipperke: 'SCHIPPERKE',
  'Finnish Spitz': 'FINNISH SPITZ',
  'Australian Shepherd': 'AUST SHEPHERD',
  'Irish Wolfhound': 'IRISH WOLFHOUND',
  'Border Terrier': 'BORDER TERRIER',
  'Afghan Hound': 'AFGHAN HOUND',
  'Bearded Collie': 'BEARDED COLLIE',
  Newfoundland: 'NEWFOUNDLAND',
  'Collie (Rough)': 'COLLIE ROUGH',
  'Treeing Tennessee Brindle': 'TENN TR BRINDLE',
  'Welsh Corgi (Pembroke)': 'WELSH CORGI PEM',
  Weimaraner: 'WEIMARANER',
  'German Pinscher': 'GERMAN PINSCHER',
  'Old English Sheepdog': 'OLDENG SHEEPDOG',
  Munsterlander: 'MUNSTERLANDER',
  'Dogo Argentino': 'DOGO ARGENTINO',
  Pekingese: 'PEKINGESE',
  'Yorkshire Terrier': 'YORKSHIRE TERR',
  'Australian Kelpie': 'AUST KELPIE',
  'Chihuahua (Short-haired)': 'CHIHUAHUA SH',
  'Curlycoat Retriever': 'CURLYCOAT RETR',
  Whippet: 'WHIPPET',
  'Norwegian Buhund': 'NORW BUHUND',
  'Clumber Spaniel': 'CLUMBER SPAN',
  'Presa Canario': 'PRESA CANARIO',
  Entlebucher: 'ENTLEBUCHER',
  'Neapolitan Mastiff': 'NEAPOLITAN MAST',
  Dalmatian: 'DALMATIAN',
  'Chinese Shar Pei': 'CHINESE SHARPEI',
  'Cane Corso': 'CANE CORSO',
  'Great Pyrenees': 'GREAT PYRENEES',
  'Chow Chow': 'CHOW CHOW',
  Keeshond: 'KEESHOND',
  'Boston Terrier': 'BOSTON TERRIER',
  'American Water Spaniel': 'AMER WATER SPAN',
  'Dandie Dinmont Terrier': 'DANDIE DINMONT',
  Catahoula: 'CATAHOULA',
  'Canaan Dog': 'CANAAN DOG',
  'Tibetan Terrier': 'TIBETAN TERR',
  Eurasier: 'EURASIER',
  'Portuguese Podengo (Pequeno)': 'PODENGO PEQUENO',
  Puli: 'PULI',
  'Anatolian Shepherd': 'ANATOL SHEPHERD',
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

        <div className="p-a300 b-c">
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
                  {this.renderNeighborhoodSelect()}
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
        <option value="OTHER">Other</option>
        <option value="UKNOWN">Unknown</option>
      </select>
    );
  }

  renderNeighborhoodSelect() {
    const displayNames = Object.keys(NEIGHBORHOODS);
    displayNames.sort();
    return (
      <select
        name="neighborhood"
        type="select"
        onChange={this.handleInputChange}
        value={this.state.neighborhood}
        id="lookup-neighborhood"
        className="sel-f">
        {displayNames.map(displayName =>
          <option value={NEIGHBORHOODS[displayName]} key={displayName}>
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
        <option value="OTHER">Other</option>
        <option value="UKNOWN">Unknown</option>
      </select>
    );
  }

  // renderPagination({ page, pageCount }: DogLicenseSearchResults) {
  //   const makeHref = (p: number) => `/dogs`;
  //   return <Pagination page={page} pageCount={pageCount} hrefFunc={makeHref} />;
  // }
}
