import {
  REQUEST_API,
  SUCCESS_REQUEST_QUESTIONS,
  FAILED_REQUEST,
  LOG_IN,
} from '../actions';

const initialState = {
  questions: [],
  error: '',
  isFetching: false,
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',

};

const player = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, isFetching: true };
  case SUCCESS_REQUEST_QUESTIONS:
    return {
      ...state,
      questions: [...action.data],
      isFetching: false,
    };
  case FAILED_REQUEST:
    return { ...state, error: action.error, isFetching: false };
  case LOG_IN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  default:
    return state;
  }
};

export default player;
