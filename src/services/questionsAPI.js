const getQuestions = async (token, settings) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&encode=url3986&token=${token}${settings}`);
  const questions = await response.json();

  return questions;
};

export default getQuestions;
