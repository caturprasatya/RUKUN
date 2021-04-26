function createToken()  {
  return Math.random().toString(36).substr(7); // remove `0.`
};

module.exports = createToken