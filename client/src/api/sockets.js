import io from "socket.io-client";
import {
  receiveAvailableBuys,
  receiveAvailableSells
} from "../reducers/availbleTrades/availbleTradesActionCreators";
import {
  receiveRecentTrades
} from "../reducers/recentTrades/recentTradesActionCreator";

let socket;

const connect = dispatch => {
  socket = io("localhost:4000");
  socket.on("aggregated buys", buys => {
    dispatch(receiveAvailableBuys(buys));
  });
  socket.on("aggregated sells", sells => {
    dispatch(receiveAvailableSells(sells));
  });
  socket.on('historic trades', trades => {
    trades = trades.map(trade => ({
      ...trade,
      time: new Date(trade.time)
    }));
    dispatch(receiveRecentTrades(trades));
  });

  socket.emit("request initial data");
};

export const sendTrade = trade => {
  if (!socket) throw new Error("Not connected - call connect first");

  socket.emit("receive trade", trade);
};

export default connect;