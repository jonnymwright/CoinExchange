var getHistoricalTrades = require("../app/recentHistoricalModel");

var appRouter = function(app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/historical", function (req, res) {
    res.status(200).send(JSON.stringify(getHistoricalTrades()));
  })
};

module.exports = appRouter;
