import getQuestions from '../../services/questionsAPI';
import getToken from '../../services/tokenAPI';

export const LOG_IN = 'LOG_IN';
export const TOKEN = 'TOKEN';
export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_REQUEST_QUESTIONS = 'SUCCESS_REQUEST_QUESTIONS';
export const SUCCESS_REQUEST_TOKEN = 'SUCCESS_REQUEST_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';

export const checkAnswer = (option, answer, points) => ({
  type: CHECK_ANSWER,
  option,
  answer,
  points,
});

export const nextQuestion = () => ({
  type: CHANGE_QUESTION,
});

export const login = (email, name) => ({
  type: LOG_IN,
  email,
  name,
});

const requestAPI = () => ({ type: REQUEST_API });

const successRequestToken = (data) => ({ type: SUCCESS_REQUEST_TOKEN, data });

const successRequestQuestions = (data) => ({ type: SUCCESS_REQUEST_QUESTIONS, data });

const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export const fetchToken = () => async (dispatch) => {
  try {
    dispatch(requestAPI());
    const token = await getToken();
    localStorage.setItem('token', token);
    dispatch(successRequestToken(token));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const fetchQuestions = (token) => async (dispatch) => {
  dispatch(requestAPI());
  const questions = await getQuestions(token);
  if (questions.response_code === 0) {
    dispatch(successRequestQuestions(questions.results));
  } else {
    dispatch(failedRequest());
  }
};
