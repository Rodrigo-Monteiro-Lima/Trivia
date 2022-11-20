const getQuestions = async (token, settings, amount) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&encode=url3986&token=${token}${settings}`);
  const questions = await response.json();

  return questions;
};

export default getQuestions;
