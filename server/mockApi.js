const API_URL = '/api/users';
const RANDOM_MULTI = 1000000000000000;

module.exports = (app) => {
  app.get(`${API_URL}/:userId`, (req, res) => {
    res.send(getFakeUser(req.params));
  });

  app.post(`${API_URL}/login`, (req, res) => {
    res.send(getFakeToken(req.params));
  });

  app.post(`${API_URL}/logout`, (req, res) => {
    res.send('ok');
  });

  app.post(`${API_URL}/:userId/accessTokens`, (req, res) => {
    res.send(getFakeToken(req.params));
  });
};

function getFakeToken(data) {
  return {
    id: Math.random() + Math.random() * RANDOM_MULTI, // totally arbitrary
    ttl: 5000, // expire after 5s for this example
    created: new Date(),
    userId: data.userId || 0,
  };
}

function getFakeUser(data) {
  return {
    id: data.userId,
    email: 'fake@fakemail.fake',
  };
}
