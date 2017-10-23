// @flow

import React from 'react';
import Head from 'next/head';
import Moment from 'moment';
import Dropzone from 'react-dropzone';
import type { Context } from 'next';
import type { ClientDependencies } from '../page';
import type { DogLicenseSearchResults } from '../types';
import { COLORS, NEIGHBORHOODS, BREEDS } from '../constants';
import type DogLicensesDao from '../dao/DogLicensesDao';

import SearchResult from './search/SearchResult';

export type InitialProps = {|
  results: ?DogLicenseSearchResults,
|};

export type Props = {
  ...InitialProps,
  dogLicensesDao: DogLicensesDao,
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
  rabiesCertFile: ?File,
  spayingCertFile: ?File,
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
        rabiesIssued: Moment(result['vacDate']).format('l') || '',
        rabiesExpire: Moment(result['vacExp']).format('l') || '',
        comments: '',
        rabiesCertFile: null,
        spayingCertFile: null,
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
        rabiesCertFile: null,
        spayingCertFile: null,
      };
    }
  }

  handleInputChange = (ev: SyntheticInputEvent) => {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (ev: SyntheticInputEvent) => {
    ev.preventDefault();
    const {
      address,
      ageMonths,
      ageYears,
      apt,
      breed,
      color,
      comments,
      dogName,
      email,
      firstName,
      lastName,
      neighborhood,
      phone,
      //rabiesCertFile,
      rabiesExpire,
      rabiesIssued,
      sex,
      //spayingCertFile,
      zip,
    } = this.state;

    this.props.dogLicensesDao.create({
      address,
      ageMonths,
      ageYears,
      apt,
      breed,
      color,
      comments,
      dogName,
      email,
      firstName,
      lastName,
      neighborhood,
      phone,
      //rabiesCertFile,
      rabiesExpire,
      rabiesIssued,
      sex,
      //spayingCertFile,
      zip,
    });
  };

  onDropRabies = (files: Array<File>) => {
    this.setState({
      rabiesCertFile: files[0],
    });
  };
  onDropSpaying = (files: Array<File>) => {
    this.setState({
      spayingCertFile: files[0],
    });
  };

  render() {
    const { rabiesCertFile, spayingCertFile } = this.state;

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
                placeholder="2/18/2014"
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
                placeholder="3/31/2017"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-rabiesCert" className="txt-l">
                Rabies Certificate
              </label>
              <Dropzone
                disableClick={false}
                multiple={false}
                accept={'image/*'}
                onDrop={this.onDropRabies}
                id={'lookup-rabiesCert'}>
                <div>
                  {'Drop a photo, or click to add.'}
                </div>
              </Dropzone>
              {rabiesCertFile &&
                <aside>
                  <h2>Dropped files</h2>
                  <ul>
                    <li>
                      {rabiesCertFile.name} - {rabiesCertFile.size} bytes
                    </li>
                  </ul>
                </aside>}
            </div>

            <div className="txt">
              <label htmlFor="lookup-spayingCert" className="txt-l">
                Spaying Certificate
              </label>
              <Dropzone
                disableClick={false}
                multiple={false}
                accept={'image/*'}
                onDrop={this.onDropSpaying}
                id={'lookup-spayingCert'}>
                <div>
                  {'Drop a photo, or click to add.'}
                </div>
              </Dropzone>
              {spayingCertFile &&
                <aside>
                  <h2>Dropped files</h2>
                  <ul>
                    <li>
                      {spayingCertFile.name} - {spayingCertFile.size} bytes
                    </li>
                  </ul>
                </aside>}
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
