// @flow

import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import type { Context } from 'next';

import type { ClientDependencies } from '../page';

import type Cart from '../store/Cart';
import Nav from '../common/Nav';
import Pagination from '../common/Pagination';
import type { DeathCertificateSearchResults } from '../types';

import SearchResult from './search/SearchResult';

export type InitialProps = {|
  query: string,
  results: ?DeathCertificateSearchResults,
|};

export type Props = {
  /* :: ...InitialProps, */
  cart: Cart,
};

type State = {
  query: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  address: string,
  neighbor: string,
  zip: string,
  dogName: string,
  ageYr: string,
  ageMo: string,
  color1: string,
  color2: string,
  breed1: string,
  breed2: string,
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
    { deathCertificatesDao }: ClientDependencies,
  ): Promise<InitialProps> {
    const { query } = ctx;

    let results = null;

    if (query.q) {
      results = await deathCertificatesDao.search(
        query.q,
        parseInt(query.page, 10) || 1,
      );
    }

    return {
      query: query.q || '',
      results,
    };
  }

  constructor(props: Props) {
    super(props);

    const { query } = props;
    //const { firstname } = props;

    this.state = {
      query,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      neighbor: '',
      zip: '',
      dogName: '',
      ageYr: '',
      ageMo: '',
      color1: '',
      color2: '',
      breed1: '',
      breed2: '',
      sex: '',
      rabiesIssued: '',
      rabiesExpire: '',
      comments: '',
    };
  }

  handleQueryChange = (ev: SyntheticInputEvent) => {
    this.setState({ query: ev.target.value });
  };

  handleInputChange = (ev: SyntheticInputEvent) => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = (ev: SyntheticInputEvent) => {
    const { query } = this.state;

    ev.preventDefault();
    Router.push(`/death?q=${encodeURIComponent(query)}`);
  };

  render() {
    const { results, cart } = this.props;
    //const { query } = this.state;

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
              <label htmlFor="text" className="txt-l">Owner First Name</label>
              <input
                id="text"
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                placeholder="Emily"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="text" className="txt-l">Owner Last Name</label>
              <input
                id="text"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                placeholder="Elizabeth"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="text" className="txt-l">Phone Number</label>
              <input
                id="text"
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
                placeholder="111-222-3333"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="text" className="txt-l">Email</label>
              <input
                id="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="e.elizabeth@bigreddog.com"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="text" className="txt-l">Address</label>
              <input
                id="text"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                placeholder="1 City Hall Square"
                className="txt-f"
              />
            </div>

            <div className="sel">
              <label htmlFor="language" className="sel-l">Neighborhood</label>
              <div className="sel-c">
                <select name="language" id="language" className="sel-f">
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
              <label htmlFor="text" className="txt-l">Zip Code</label>
              <input
                id="text"
                name="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
                placeholder="02116"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="text" className="txt-l">Dog Name</label>
              <input
                id="text"
                name="dogName"
                value={this.state.dogName}
                onChange={this.handleInputChange}
                placeholder="Clifford"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="text" className="txt-l">Dog Age (Years)</label>
              <style textAlign="right" />
              <input
                id="text"
                name="zip"
                value={this.state.zip}
                onChange={this.handleInputChange}
                placeholder="2, 0.5, 17..."
                className="txt-f"
              />
            </div>

            <div className="sel">
              <label htmlFor="language" className="sel-l">
                Dog Breed
              </label>
              <div className="sel-c">
                <select name="language" id="language" className="sel-f">
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
              <label htmlFor="language" className="sel-l">
                Primary Dog Color
              </label>
              <div className="sel-c">
                <select name="language" id="language" className="sel-f">
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
              <label htmlFor="language" className="sel-l">
                Dog Sex
              </label>
              <div className="sel-c">
                <select name="language" id="language" className="sel-f">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>

            <div className="txt">
              <label htmlFor="text" className="txt-l">Comments</label>
              <textarea
                id="text"
                placeholder="My dog is a mutt, with breeds..."
                className="txt-f"
                rows="10"
              />
            </div>

            <div className="m-v400 m-h200">
              <button className="btn" type="submit">Payment</button>
            </div>

          </form>
        </div>

        {results && this.renderResults(results)}
        <div />

      </div>
    );
  }

  renderResults(results: DeathCertificateSearchResults) {
    // we want the query that was searched for
    const { query } = this.props;

    const start = 1 + (results.page - 1) * results.pageSize;
    const end = Math.min(start + results.pageSize - 1, results.resultCount);

    return (
      <div>
        <div className="p-a300 b--w">
          <div className="t--sans tt-u" style={{ fontSize: 12 }}>
            Showing {start}–{end} of {results.resultCount.toLocaleString()}{' '}
            results for “{query}”
          </div>
        </div>

        {results.results.map(certificate =>
          <SearchResult certificate={certificate} key={certificate.id} />,
        )}

        {results.resultCount > results.results.length &&
          this.renderPagination(results)}

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

  renderPagination({ page, pageCount }: DeathCertificateSearchResults) {
    const { query } = this.props;
    const makeHref = (p: number) => `/death?q=${query}&page=${p}`;

    return <Pagination page={page} pageCount={pageCount} hrefFunc={makeHref} />;
  }
}
