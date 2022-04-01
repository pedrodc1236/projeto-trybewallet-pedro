import allCurrency from '../services/currencyAPI';

export const USER_ACTION = 'USER_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';

export const loginAction = (payload) => ({
  type: USER_ACTION,
  payload,
});

export const getCurrency = (payload) => ({
  type: WALLET_ACTION,
  payload,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const result = await allCurrency();
    dispatch(getCurrency(result));
  };
}
