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
  dogName: string,
  year: string,
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

    //THIS SEARCH FUNCTION IS NOT BEING USED NOW
    if (query.firstName && query.lastName && query.dogName && query.year) {
      results = await dogLicensesDao.search(
        query.firstName,
        query.lastName,
        query.dogName,
        parseInt(query.year, 10),
      );
      console.log('SearchPage: ', results);
    }

    return {
      results,
    };
  }

  constructor(props: Props) {
    super(props);
    //const { results } = props;

    this.state = {
      firstName: '',
      lastName: '',
      dogName: '',
      year: '',
    };
  }

  handleInputChange = (ev: SyntheticInputEvent) => {
    const target = ev.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  render() {
    const { results } = this.props;

    return (
      <div>
        <Head>
          <title>Boston.gov — Dog Licenses</title>
        </Head>

        <div className="p-a300">
          <div className="sh sh--b0">
            <h1 className="sh-title">Renew Your Dog License</h1>
          </div>

          <form
            className="sf sf--md"
            acceptCharset="UTF-8"
            method="get"
            action="/dogs/form">
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
              <label htmlFor="text" className="txt-l">Dog name</label>
              <input
                id="text"
                type="text"
                name="dogName"
                value={this.state.dogName}
                onChange={this.handleInputChange}
                placeholder="Clifford"
                className="txt-f"
              />
            </div>

            <div className="txt">
              <label htmlFor="text" className="txt-l">Year licensed</label>
              <input
                id="text"
                type="text"
                name="year"
                value={this.state.year}
                onChange={this.handleInputChange}
                placeholder="2016"
                className="txt-f"
              />
            </div>

            <button className="btn" type="submit">Search for id</button>

          </form>
        </div>

        {results && this.renderResults(results)}
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

        <form
          className="sf sf--md"
          acceptCharset="UTF-8"
          method="get"
          action="/dogs/form">
          <input name="utf8" type="hidden" value="✓" />

          <div className="m-v400 m-h200">
            <button className="btn" type="submit">Renew This license</button>
          </div>

        </form>
      </div>
    );
  }
}
