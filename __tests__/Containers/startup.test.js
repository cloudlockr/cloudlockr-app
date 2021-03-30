import 'react-native'
import React from 'react'
import { IndexStartupContainer } from '../../src/Containers'
import { render } from '@testing-library/react-native'

import { store } from '../../src/Store'
import { Provider } from 'react-redux'

it('renders and matches snapshot', () => {
  const { toJSON } = render(<Provider store={store}><IndexStartupContainer /></Provider>);
  expect(toJSON()).toMatchSnapshot();
});
