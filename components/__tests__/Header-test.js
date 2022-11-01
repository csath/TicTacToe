import * as React from 'react';
import renderer from 'react-test-renderer';

import Header from '../Header';

it.skip(`Header renders correctly`, () => {
  const tree = renderer.create(<Header text='test'/>).toJSON();

  expect(tree).toMatchSnapshot();
});
