import { SUCCESS_REQUEST_TOKEN, SETTINGS } from '../actions';

const initialState = {
  token: '',
  settings: '',
};

const token = (state = initialState, action) => {
  console.log(action);
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
    };
  default:
    return state;
  }
};

export default token;
