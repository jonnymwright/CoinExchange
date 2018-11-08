import React from "react";
import MyOrderBookView from "./MyOrderBook/MyOrderBookView";
import AggregatedOrderBookView from "./AggregatedOrderBook/AggregatedOrderBookView";
import RecentTradesController from "./RecentTrades/RecentTradesControl";

const BodyView = () => (
  <div className="card-deck">
    <MyOrderBookView />
    <AggregatedOrderBookView/>
    <RecentTradesController/>
  </div>
);
export default BodyView;
