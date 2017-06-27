// @flow

import React from 'react';
import Head from 'next/head';
//import Router from 'next/router';
//import type { Context } from 'next';

//import type { ClientDependencies } from '../page';

import type Cart from '../store/Cart';
import Nav from '../common/Nav';
//import Pagination from '../common/Pagination';
import type { DeathCertificateSearchResults } from '../types';

import SearchResult from './search/SearchResult';

export type InitialProps = {|
  results: ?DeathCertificateSearchResults,
|};

export type Props = {
  /* :: ...InitialProps, */
  cart: Cart,
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
  dogAge: string,
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

  // static async getInitialProps(
  //   ctx: Context<*>,
  //   { deathCertificatesDao }: ClientDependencies,
  // ): Promise<InitialProps> {
  //   let results = null;

  //   return {
  //     results,
  //   };
  // }

  constructor(props: Props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      neighborhood: '',
      zip: '',
      dogName: '',
      dogAge: '',
      color: '',
      breed: '',
      sex: '',
      rabiesIssued: '',
      rabiesExpire: '',
      comments: '',
    };
  }

  handleInputChange = (ev: SyntheticInputEvent) => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (ev: SyntheticInputEvent) => {
    ev.preventDefault();
    //Router.push(`/death?q=${encodeURIComponent(query)}`);
  };

  render() {
    const { /*results,*/ cart } = this.props;
    return (
      <div>
        <Head>
          <title>Boston.gov — Dog Certificates</title>
        </Head>

        <Nav cart={cart} link="checkout" />

        <div className="p-a300">
          <div className="sh sh--b0">
            <h1 className="sh-title">Search for dog id</h1>
          </div>

          <form
            className="sf sf--md"
            acceptCharset="UTF-8"
            method="get"
            action="/death"
            onSubmit={this.handleSubmit}>
            <input name="utf8" type="hidden" value="✓" />

            <div className="txt">
              <label htmlFor="lookup-firstName" className="txt-l">
                Owner First Name
              </label>
              <input
                id="lookup-firstname"
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
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                placeholder="1 City Hall Square"
                className="txt-f"
              />
            </div>

            <div className="sel">
              <label htmlFor="lookup-neighborhood" className="sel-l">
                Neighborhood
              </label>
              <div className="sel-c">
                <select
                  name="neighborhood"
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

            <div className="txt">
              <label htmlFor="lookup-zip" className="txt-l">Zip Code</label>
              <input
                id="lookup-zip"
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
                name="dogName"
                value={this.state.dogName}
                onChange={this.handleInputChange}
                placeholder="Clifford"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="lookup-dogAge" className="txt-l">
                Dog Age (Years)
              </label>
              <style textAlign="right" />
              <input
                id="lookup-dogAge"
                name="dogAge"
                value={this.state.dogAge}
                onChange={this.handleInputChange}
                placeholder="2, 0.5, 17..."
                className="txt-f"
              />
            </div>

            <div className="sel">
              <label htmlFor="lookup-breed" className="sel-l">
                Dog Breed
              </label>
              <div className="sel-c">
                <select
                  name="breed"
                  id="lookup-breed"
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

            <div className="sel">
              <label htmlFor="lookup-color" className="sel-l">
                Primary Dog Color
              </label>
              <div className="sel-c">
                <select
                  name="color"
                  id="lookup-color"
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

            <div className="sel">
              <label htmlFor="lookup-sex" className="sel-l">
                Dog Sex
              </label>
              <div className="sel-c">
                <select
                  name="sex"
                  id="lookup-sex"
                  value={this.state.sex}
                  className="sel-f">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>

            <div className="txt">
              <label htmlFor="lookup-rabiesIssue" className="txt-l">
                Rabies Issue Date
              </label>
              <input
                id="lookup-rabiesIssue"
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

            <div className="m-v400 m-h200">
              <button className="btn" type="submit">Payment</button>
            </div>

          </form>
        </div>

        {/*results && this.renderResults(results)*/}
        <div />

      </div>
    );
  }

  renderResults(results: DeathCertificateSearchResults) {
    // we want the query that was searched for
    const start = 1 + (results.page - 1) * results.pageSize;
    const end = Math.min(start + results.pageSize - 1, results.resultCount);

    return (
      <div>
        <div className="p-a300 b--w">
          <div className="t--sans tt-u" style={{ fontSize: 12 }}>
            Showing {start}–{end} of {results.resultCount.toLocaleString()}{' '}
            results for “”
          </div>
        </div>

        {results.results.map(certificate =>
          <SearchResult certificate={certificate} key={certificate.id} />,
        )}

        {results.resultCount >
          results.results
            .length /*&&
          this.renderPagination(results)*/}

        <div className="p-a300">
          Not finding what you’re looking for? Try refining your search or{' '}
          <a
            href="https://www.boston.gov/departments/registry/how-get-death-certificate"
            style={{ fontStyle: 'italic' }}>
            request a death certificate
          </a>.
        </div>
      </div>
    );
  }

  // renderPagination({ page, pageCount }: DeathCertificateSearchResults) {
  //   const makeHref = (p: number) => `/death`;
  //   return <Pagination page={page} pageCount={pageCount} hrefFunc={makeHref} />;
  // }
}
