import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type ExpenseType = {
  id: number,
  value: number | string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: {
    [currency: string]: CurrencyType
  },
};

export type CurrencyType = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string | number | any;
  ask: string | number | any;
  timestamp: string;
  create_date: string;
};

export type ReduxState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: string[],
    expenses: ExpenseType[],
    editor: boolean,
    idToEdit: number,
  }
};

export type Dispatch = ThunkDispatch<ReduxState, void, AnyAction>;
