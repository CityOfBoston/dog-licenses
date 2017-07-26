// @flow

import React from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react';

type Props = {|
  link: 'lookup' | 'checkout',
|};

export default observer(function Nav({ link }: Props) {
  let linkTitle;
  let linkPath;

  switch (link) {
    case 'checkout':
      linkTitle = 'Checkout';
      linkPath = '/dogs/checkout';
      break;
    case 'lookup':
      linkTitle = 'Back to Lookup';
      linkPath = '/dogs';
      break;
    default:
      linkTitle = null;
      linkPath = '';
      break;
  }

  return (
    <nav className="nv-s nv-s--sticky">
      <div className="nv-s-l bar">
        <Link href={linkPath}>
          <a className={'nv-s-l-b back-link'}>{linkTitle}</a>
        </Link>
      </div>

      <style jsx>{`
        .bar {
          display: flex;
        }
        .back-link {
          display: block !important;
          flex: 1;
        }
        .back-link:after {
          display: none !important;
        }
        .cart-link {
          display: block;
          position: relative;
          background: white;
          color: inherit;
          padding: .5em 0;
          margin-right: 1.25rem;
          width: 3em;
          text-align: center;
          font-style: italic;
        }
        .cart-link:before {
          content: "";
          display: block;
          border-color: transparent white transparent transparent;
          border-width: 5px 10px;
          border-style: solid;
          position: absolute;
          width: 0;
          height: 0;
          left: -20px;
          top: 12px;
        }
      `}</style>
    </nav>
  );
});
