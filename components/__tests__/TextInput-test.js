import * as React from 'react';
import renderer from 'react-test-renderer';

import TextInput from '../TextInput';

it(`TextInput renders correctly`, () => {
  const tree = renderer.create(<TextInput text='test'/>).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree.children.length).toBe(2);
});
