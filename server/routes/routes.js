var getHistoricalTrades = require("../app/recentHistoricalModel");
var aggregatedOrderBookModel = require("../app/aggregatedOrderBookModel");
var userRoutes = require('./userRoutes')

var appRouter = function(app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/historical", function (req, res) {
    res.status(200).send(JSON.stringify(getHistoricalTrades()));
  });

  app.get("/aggregated/buys", function (req, res) {
    res.status(200).send(JSON.stringify(aggregatedOrderBookModel.getAggregatedBuyOrders()));
  });

  app.get("/aggregated/sells", function (req, res) {
    res.status(200).send(JSON.stringify(aggregatedOrderBookModel.getAggregatedSellOrders()));
  });

  userRoutes.addUserRoutes(app);
};

module.exports = appRouter;
