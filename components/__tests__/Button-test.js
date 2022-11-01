import * as React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';

it(`Button renders correctly`, () => {
  const tree = renderer.create(<Button text='test'/>).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree.children.length).toBe(1);
});
