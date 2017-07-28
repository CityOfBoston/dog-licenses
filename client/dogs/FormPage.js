// @flow

import React from 'react';
import Head from 'next/head';
import type { Context } from 'next';
import type { ClientDependencies } from '../page';
import type { DogLicenseSearchResults } from '../types';

import SearchResult from './search/SearchResult';

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
        email: '',
        address: result['address'] || '',
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
              <label htmlFor="lookup-address" className="txt-l">Address</label>
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
                    <option value="Allston">Allston</option>
                    <option value="Back Bay">Back Bay</option>
                    <option value="Beacon Hill">Beacon Hill</option>
                    <option value="Boston">Boston</option>
                    <option value="Brighton">Brighton</option>
                    <option value="Charleston">Charleston</option>
                    <option value="Dorchester">Dorchester</option>
                    <option value="East Boston">East Boston</option>
                    <option value="Hyde Park">Hyde Park</option>
                    <option value="Jamaica Plain">Jamaica Plain</option>
                    <option value="Mattapan">Mattapan</option>
                    <option value="Readville">Readville</option>
                    <option value="Roslindale">Roslindale</option>
                    <option value="Roxbury">Roxbury</option>
                    <option value="South Boston">South Boston</option>
                    <option value="West Roxbury">West Roxbury</option>
                  </select>
                </div>
              </div>
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
              <label htmlFor="lookup-dogYear" className="txt-l">
                Dog Age (Years)
              </label>
              <input
                id="lookup-dogYear"
                type="text"
                name="dogYear"
                value={this.state.ageYears}
                onChange={this.handleInputChange}
                placeholder="2, 0.5, 17..."
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-dogMo" className="txt-l">
                Dog Age (Months)
              </label>
              <input
                id="lookup-dogMo"
                type="text"
                name="dogMo"
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
                  <select
                    name="breed"
                    id="lookup-breed"
                    onChange={this.handleInputChange}
                    value={this.state.breed}
                    className="sel-f">
                    <option value="Alaskan Malamute">Alaskan Malamute</option>
                    <option value="Alaskan Husky">Alaskan Husky</option>
                    <option value="Pit Bull Terrier">Pit Bull Terrier</option>
                    <option value="Bulldog">Bulldog</option>
                    <option value="Australian Shephard">
                      Australian Shephard
                    </option>
                    <option value="Basset Hound">Basset Hound</option>
                    <option value="Italian Greyhound">Italian Greyhound</option>
                    <option value="Otterhound">Otterhound</option>
                    <option value="Pharoah Hound">Pharoah Hound</option>
                    <option value="Plott Hound">Plott Hound</option>
                    <option value="Portuguese Water Dog">
                      Portuguese Water Dog
                    </option>
                    <option value="Whippet">Whippet</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="fs-c m-b300">
              <div className="sel">
                <label htmlFor="lookup-bolor" className="sel-l sel-l--mt000">
                  Primary Color
                </label>
                <div className="sel-c sel-c--fw">
                  <select
                    name="color"
                    id="lookup-color"
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.color}
                    className="sel-f">
                    <option value="Black">Black</option>
                    <option value="Brown">Brown</option>
                    <option value="Tan">Tan</option>
                    <option value="White">White</option>
                    <option selected value="Red-Brown">Red-Brown</option>
                    <option value="Grey">Grey</option>
                  </select>
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
                    <option value="Female">Un=spayed Female ($30)</option>
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

  // renderPagination({ page, pageCount }: DogLicenseSearchResults) {
  //   const makeHref = (p: number) => `/dogs`;
  //   return <Pagination page={page} pageCount={pageCount} hrefFunc={makeHref} />;
  // }
}
