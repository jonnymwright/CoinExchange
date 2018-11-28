import React from "react";
import TradeTimeView from './TradeTimeView';
import RoundedNumber from '../../RoundedNumber'

const RecentTradesView = ({ recentTrades }) => (
  <div className="card mb-4 shadow-sm">
    <div className="card-header">
      <h3 className="my-0 font-weight-normal">Recent trades</h3>
    </div>
    <div className="card-body">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>
              <h4>Price</h4>
            </th>
            <th>
              <h4>Quantity</h4>
            </th>
            <th>
              <h4>Time</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {recentTrades.map((trade, i) => {
            return (
              <tr key={i}>
                <td><RoundedNumber>{trade.price}</RoundedNumber></td>
                <td><RoundedNumber>{trade.quantity}</RoundedNumber></td>
                <td><TradeTimeView time={trade.time}/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
export default RecentTradesView;
