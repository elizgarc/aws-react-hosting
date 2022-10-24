import React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen, fireEvent, getByLabelText, getByText, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CreateAccount from './createaccount';
import UserContext from './context';
import { act } from 'react-dom/test-utils';

describe('Create Account render Page', () => {
  it('renders Create Account page', () => {
    render(<CreateAccount />);
    expect(screen.getByRole('heading', {name: "Create Account Page"}));
    expect(document.querySelector('.card-header').textContent).toBe('Create Account');
  });

  it('renders 4 input fields', () => {
    render(<CreateAccount />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<CreateAccount />);
    expect(screen.getByRole('button', {type: 'submit'})).toBeInTheDocument();
  });
});

describe('Form behaviior', () => {
  it('submit button should be disabled if all fields are empty', async () => {
    render(<CreateAccount />);
    expect(screen.getByRole('button', {type: 'submit'}).disabled).toBe(true);
  });

  it('validate user inputs, and provides error messages', async () => {
    render(<CreateAccount />);

    await act (async () => {
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: {value: ''},
      });

      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: {value: ''},
      });

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: {value: ''},
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: {value: ''},
      });
    });

    await act (async () => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(screen.getByText(/First Name must be 2 or more/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name must be 2 or more/i)).toBeInTheDocument();
    expect(screen.getByText(/Valid email address required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password must be 8 or more/i)).toBeInTheDocument();
  });

  it('success message should be shown on successful form submit', async () => {
    render(
      <UserContext.Provider value={{users: []}}>
        <CreateAccount />
      </UserContext.Provider>
    );

  
    await act (async () => {
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: {value: 'Elizabeth'},
      });

      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: {value: 'Garcia'},
      });

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: {value: 'email@email.com'},
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: {value: 'password'},
      });
    });


    await act (async () => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(document.querySelector('.card-header').textContent).toBe('Account Created');
  });


});


