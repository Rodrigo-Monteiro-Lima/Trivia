import { SUCCESS_REQUEST_TOKEN } from '../actions';

const initialState = {
  token: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SUCCESS_REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default userReducer;
