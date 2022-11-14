import {
  REQUEST_API,
  SUCCESS_REQUEST_QUESTIONS,
  FAILED_REQUEST,
  LOG_IN,
  CHECK_ANSWER,
  CHANGE_QUESTION,
  NEW_GAME,
} from '../actions';

const initialState = {
  questions: [],
  error: false,
  isFetching: true,
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  selectedAnswer: false,
};

const ten = 10;
const one = 1;

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
    return {
      ...state,
      error: true,
      isFetching: false,
    };
  case LOG_IN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case CHECK_ANSWER:
    return {
      ...state,
      score: action.option === action.answer
        ? state.score + (ten + action.points) : state.score,
      selectedAnswer: true,
      assertions: action.option === action.answer
        ? state.assertions + one : state.assertions,
    };
  case CHANGE_QUESTION: {
    return {
      ...state,
      selectedAnswer: false,
    };
  }
  case NEW_GAME: {
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  }
  default:
    return state;
  }
};

export default player;
