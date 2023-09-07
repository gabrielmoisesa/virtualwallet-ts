import { ExpenseType } from '../../types';

// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveEmail = (email: string) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const saveCurrencies = (currencies: string[] | void) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const saveExpense = (expenses: ExpenseType) => ({
  type: SAVE_EXPENSE,
  payload: expenses,
});

export const deleteExpense = (newExpenses: ExpenseType[]) => ({
  type: DELETE_EXPENSE,
  payload: newExpenses,
});
