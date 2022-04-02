import { allCurrency, apiRequest } from '../services/currencyAPI';

export const USER_ACTION = 'USER_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';
export const API_ACTION = 'API_ACTION';

export const loginAction = (payload) => ({
  type: USER_ACTION,
  payload,
});

export const getCurrency = (payload) => ({
  type: WALLET_ACTION,
  payload,
});

export const getApi = (api) => ({
  type: API_ACTION,
  api,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const result = await allCurrency();
    dispatch(getCurrency(result));
  };
}

export function fetchAll(state) {
  return async (dispatch) => {
    const result = await apiRequest();
    const objApi = {
      exchangeRates: result,
    };
    const objLast = {
      ...state, ...objApi,
    };
    dispatch(getApi(objLast));
  };
}
