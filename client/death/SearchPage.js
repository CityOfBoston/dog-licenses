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
  dogName: string,
  year: string,
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
      //firstname,
      firstName: '',
      lastName: '',
      dogName: '',
      year: '',
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
    const { query } = this.state;

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
                name="year"
                value={this.state.year}
                onChange={this.handleInputChange}
                placeholder="2016"
                className="txt-f"
              />
            </div>
            <div className="m-v400 m-h200">
              <button className="btn" type="submit">Search for id</button>
            </div>

          </form>

          <form
            className="sf sf--md"
            acceptCharset="UTF-8"
            method="get"
            action="/death"
            onSubmit={this.handleSubmit}>
            <input name="utf8" type="hidden" value="✓" />

            <div className="sf-i">
              <input
                type="text"
                name="q"
                id="q"
                value={query}
                onChange={this.handleQueryChange}
                placeholder="Search…"
                className="sf-i-f"
                autoComplete="off"
              />
              <button className="sf-i-b" type="submit">Search</button>
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
