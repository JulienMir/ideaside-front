import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import Staking from './Staking';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Staking />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
