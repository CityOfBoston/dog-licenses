// @flow

import React from 'react';
import Head from 'next/head';

export default class TitlePage extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Boston.gov — Dog Licenses</title>
        </Head>
        <div className="p-a300 b-c">
          <div className="sh sh--b0">
            <h1 className="sh-title">
              {"Welcome to The City of Boston's Dog License Renewal service."}
            </h1>
          </div>
          <div className="m-v400">
            <a href="/dogs/search" className="btn">
              Search for an Existing License
            </a>
          </div>
          <div>
            <a href="/dogs/form" className="btn">
              Create a new License
            </a>
          </div>
        </div>
      </div>
    );
  }
}
