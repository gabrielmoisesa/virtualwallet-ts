import { AnyAction } from 'redux';
import { DELETE_EXPENSE, SAVE_CURRENCIES, SAVE_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case SAVE_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };
    case SAVE_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: action.payload,
      };
    default:
      return state;
  }
}

export default wallet;
