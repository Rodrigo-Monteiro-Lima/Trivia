import { questionsResponse, invalidTokenQuestionsResponse } from './questions'

export const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(questionsResponse),
});

export const failedMockFetch = () => Promise.resolve({
  json: () => Promise.resolve(invalidTokenQuestionsResponse),
});
