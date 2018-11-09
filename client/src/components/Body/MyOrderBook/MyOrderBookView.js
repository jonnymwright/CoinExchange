import React from "react";
import MyBuysController from "./MyBuysController";
import MySellsController from "./MySellsController";
import NewTradeController from "./NewTradeController";

const MyOrderBookView = () => (
  <div className="card mb-4 shadow-sm">
    <div className="card-header">
      <h3 className="my-0 font-weight-normal">My order book</h3>
    </div>
    <div className="card-body">
      <MyBuysController/>
      <MySellsController/>
      <NewTradeController/>
    </div>
  </div>
);

export default MyOrderBookView;
