import React from "react";
import AvailableBuysControl from './AvailableBuysControl';
import AvailableSellsControl from './AvailableSellsControl';

const AggregatedOrderBookView = () => (
  <div className="card mb-4 shadow-sm">
    <div className="card-header">
      <h3 className="my-0 font-weight-normal">Aggregated order book</h3>
    </div>
    <div className="card-body">
      <AvailableBuysControl/>
      <AvailableSellsControl/>
    </div>
  </div>
);
export default AggregatedOrderBookView;