// @flow

import React from 'react';
import Link from 'next/link';

import type { DogLicense } from '../../types';
import { GRAY_100 } from '../../common/style-constants';

export type Props = {|
  license: DogLicense,
|};

export default function SearchResult({
  license: { firstName, lastName, dogName, id, phone },
}: Props) {
  return (
    <Link href={`/dogs/license?id=${id}`} as={`/dogs/license/${id}`}>
      <a className={'p-a300 br br-t100 b--w result'}>
        <div
          className="t--sans"
          style={{
            fontStyle: 'normal',
            fontWeight: 'bold',
            letterSpacing: 1.4,
          }}>
          Name: {firstName} {lastName}
        </div>
        <div
          className="t--sans"
          style={{
            fontStyle: 'normal',
            fontWeight: 'bold',
            letterSpacing: 1.4,
          }}>
          Dog: {dogName}
        </div>
        <div
          className="t--sans"
          style={{
            fontStyle: 'normal',
            fontWeight: 'bold',
            letterSpacing: 1.4,
          }}>
          Dog ID: {id}
        </div>
        <div
          className="t--sans"
          style={{
            fontStyle: 'normal',
            fontWeight: 'bold',
            letterSpacing: 1.4,
          }}>
          Phone: {phone}
        </div>
        <style jsx>{`
            .result {
              display: block;
              color: inherit;
              font-style: italic;
              border-color: ${GRAY_100};
            }
          `}</style>
      </a>
    </Link>
  );
}
