const path = require('path');
const CLIENT_ROUTES = require('../common/routes').list();

// express-style routing...
module.exports = (app, mode) => {
  // config public directory
  app.use(express.static(path.join(__dirname, '../public')));

  CLIENT_ROUTES.forEach((route) => {
    app.get(route, (req, res) => {
      // redirect to a hash path in dev
      if (mode === env.DEVELOPMENT) {
        res.redirect(['/#', req.originalUrl].join(''));
        return true;
      }
      res.sendFile(path.join(__dirname, '../public/index.html'));
      return true;
    });
  });
};
