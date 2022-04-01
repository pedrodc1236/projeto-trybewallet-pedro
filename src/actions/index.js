export const USER_ACTION = 'USER_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';

export const loginAction = (payload) => ({
  type: USER_ACTION,
  payload,
});

export const walletAction = (payload) => ({
  type: WALLET_ACTION,
  payload,
});
