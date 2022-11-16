const getQ = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  // .then((response) => response.arrayBuffer())
  // .then((buffer) => {
  //   const decoder = new TextDecoder('iso-8859-1');
  //   const text = decoder.decode(buffer);
  //   return text;
  // });
  const data = await request.text();
  // const algo = await request.arrayBuffer();
  // const algo2 = new TextDecoder('iso-8859-1');
  // const text = algo2.decode(algo);

  return data;
};

export default getQ;
