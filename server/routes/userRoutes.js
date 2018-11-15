var usersModel = require('../app/usersModel');

const addUserRoutes = function(app) {
  app.get('/users', function(req, res) {
    res.status(200).send(JSON.stringify(usersModel.getUsers()));
  });

  app.get('/users/:userId/buys', function(req, res) {
      res.status(200).send(usersModel.getBuys(req.params.userId));
  });
  
  app.get('/users/:userId/sells', function(req, res) {
    res.status(200).send(usersModel.getSells(req.params.userId));
});
};

module.exports = { addUserRoutes };