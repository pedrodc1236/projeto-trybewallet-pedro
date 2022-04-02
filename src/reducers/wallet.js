import { WALLET_ACTION, API_ACTION } from '../actions';

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
  default:
    return state;
  }
};

export default wallet;
