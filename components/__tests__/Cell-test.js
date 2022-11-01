import * as React from 'react';
import renderer from 'react-test-renderer';

import Cell from '../Cell';

it(`Cell renders correctly`, () => {
  const tree = renderer.create(<Cell text='test'/>).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree.children.length).toBe(1);
});
