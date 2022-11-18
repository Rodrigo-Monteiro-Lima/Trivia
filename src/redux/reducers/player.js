import {
  REQUEST_API,
  SUCCESS_REQUEST_QUESTIONS,
  FAILED_REQUEST,
  LOG_IN,
  CHECK_ANSWER,
  CHANGE_QUESTION,
  NEW_GAME,
  TIME_OUT,
  HELP,
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
  help: false,
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
    return { ...state, selectedAnswer: false };
  }
  case NEW_GAME: {
    return { ...state, score: 0, assertions: 0, help: false, selectedAnswer: false };
  }
  case TIME_OUT: {
    return {
      ...state,
      selectedAnswer: true,
    };
  }
  case HELP: {
    return { ...state, help: true };
  }
  default:
    return state;
  }
};

export default player;
