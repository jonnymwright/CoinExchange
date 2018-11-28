import React from "react";
import RoundedNumber from '../RoundedNumber';

const AvailableTradesView = ({ trades, type }) => (
  <div>
    <div className="card-header">
      <h4>{type}</h4>
    </div>
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
            <h4>Summed</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade, i) => {
          return (
            <tr key={i}>
              <td><RoundedNumber>{trade.price}</RoundedNumber></td>
              <td><RoundedNumber>{trade.quantity}</RoundedNumber></td>
              <td><RoundedNumber>{trade.price * trade.quantity}</RoundedNumber></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default AvailableTradesView;
