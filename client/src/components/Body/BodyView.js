import React from 'react';
import MyOrderBookView from './MyOrderBook/MyOrderBookView';
import AggregatedOrderBookView from './AggregatedOrderBook/AggregatedOrderBookView';
import RecentTradesController from './RecentTrades/RecentTradesControl';
import DepthChartCard from './DepthChart/DepthChartCard';

const BodyView = () => (
  <div>
    <div className="card-deck">
      <MyOrderBookView />
      <AggregatedOrderBookView/>
      <RecentTradesController/>
    </div>
    <DepthChartCard />
  </div>
);
export default BodyView;
