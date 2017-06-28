// @flow

import React from 'react';
import Head from 'next/head';
import type { Context } from 'next';

import type { DogLicense } from '../types';
import type { ClientDependencies } from '../page';

import type Cart from '../store/Cart';
import Nav from '../common/Nav';

export type InitialProps = {|
  id: string,
  license: ?DogLicense,
|};

export type Props = {
  /* :: ...InitialProps, */
  cart: Cart,
};

type State = {
  quantity: number,
};

export default class LicensePage extends React.Component {
  props: Props;
  state: State = {
    quantity: 1,
  };

  static async getInitialProps(
    ctx: Context<*>,
    { dogLicensesDao }: ClientDependencies,
  ): Promise<InitialProps> {
    const { query: { id } } = ctx;

    const license = await dogLicensesDao.get(id);

    return {
      id,
      license,
    };
  }

  handleQuantityChange = (ev: SyntheticInputEvent) => {
    this.setState({
      quantity: parseInt(ev.target.value, 10),
    });
  };

  handleAddToCart = (ev: SyntheticInputEvent) => {
    const { cart, license } = this.props;
    const { quantity } = this.state;

    ev.preventDefault();

    if (license) {
      cart.add(license, quantity);
    }
  };

  render() {
    const { id, license, cart } = this.props;

    return (
      <div>
        <Head>
          <title>Boston.gov — Dog License #{id}</title>
        </Head>

        <Nav cart={cart} link="checkout" />

        <div className="p-a300">
          <div className="sh sh--b0">
            <h1 className="sh-title" style={{ marginBottom: 0 }}>
              Deceased Details
            </h1>
          </div>
        </div>

        <div className="p-a300 b--w">
          {license && this.rednerLicense(license)}
        </div>
      </div>
    );
  }

  rednerLicense({
    firstName,
    lastName,
    age,
    deathDate,
    deathYear,
  }: DogLicense) {
    const { quantity } = this.state;

    return (
      <div>
        <ul className="dl">
          <li className="dl-i">
            <span className="dl-t">Full Name</span>
            <span className="dl-d">{firstName} {lastName}</span>
          </li>
          <li className="dl-i">
            <span className="dl-t">Date of Death</span>
            <span className="dl-d">{deathDate || deathYear}</span>
          </li>
          <li className="dl-i">
            <span className="dl-t">Age</span>
            <span className="dl-d">{age}</span>
          </li>
        </ul>

        <form
          onSubmit={this.handleAddToCart}
          className="js-add-to-cart-form m-v300">
          <select
            name="quantity"
            value={quantity}
            className="quantity"
            onChange={this.handleQuantityChange}>
            <option value="1">Qty: 1</option>
            <option value="2">Qty: 2</option>
            <option value="3">Qty: 3</option>
            <option value="4">Qty: 4</option>
            <option value="5">Qty: 5</option>
            <option value="6">Qty: 6</option>
            <option value="7">Qty: 7</option>
            <option value="8">Qty: 8</option>
            <option value="9">Qty: 9</option>
            <option value="10">Qty: 10</option>
          </select>

          <button type="submit" className="btn add-to-cart">Add to Cart</button>
        </form>

        <style jsx>{`
          form {
            display: flex;
            align-items: center;
          }
          .quantity {
            min-width: 5em;
          }
          .add-to-cart {
            flex: 1;
            margin-left: 1em;
          }
        `}</style>
      </div>
    );
  }
}
