// @flow

import React from 'react';
import Head from 'next/head';

export type InitialProps = {||};

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

  constructor(props: Props) {
    super(props);

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
                required
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
                required
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
                required
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
                required
              />
            </div>

            <button className="btn" type="submit">Search for id</button>

          </form>
        </div>
        <div />
      </div>
    );
  }
}
