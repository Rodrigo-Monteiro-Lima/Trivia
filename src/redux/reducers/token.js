import { SUCCESS_REQUEST_TOKEN, SETTINGS } from '../actions';

const initialState = {
  token: '',
  settings: '',
  amount: '5',
};

const token = (state = initialState, action) => {
  switch (action.type) {
  case SUCCESS_REQUEST_TOKEN:
    return {
      ...state,
      token: action.data,
    };
  case SETTINGS:
    return {
      ...state,
      settings: action.settings,
      amount: action.amount,
    };
  default:
    return state;
  }
};

export default token;
