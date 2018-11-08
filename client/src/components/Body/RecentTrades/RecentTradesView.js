import React from "react";

const RecentTradesView = ({ recentTrades, displayDate }) => (
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
                <td>{trade.price}</td>
                <td>{trade.quantity}</td>
                <td>{displayDate(trade.time)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
export default RecentTradesView;
