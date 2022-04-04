import { WALLET_ACTION, API_ACTION, REMOVE_ACTION } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return {
      ...state,
      currencies: action.payload,
    };
  case API_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.api],
    };
  case REMOVE_ACTION:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== action.payload)],
    };
  default:
    return state;
  }
};

export default wallet;
