import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import Products from './product';

describe('Products component', () => {
  const mockStore = configureStore();
  const initialState = {
    products: {
      products: [], 
      error: null,
    },
  };

  test('renders Products component', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

  
    expect(screen.getByText('Sort By:')).toBeInTheDocument();
    expect(screen.getByText('Filter By Category:')).toBeInTheDocument();

  });

  
  test('clicking on Add Product button opens the AddProductForm modal', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    userEvent.click(screen.getByRole('button', { name: 'Add Product' }));

    
    expect(screen.getByText('Add Product')).toBeInTheDocument();
   
  });
});
