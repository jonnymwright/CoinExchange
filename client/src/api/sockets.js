import io from "socket.io-client";
import {
  receiveAvailableBuys,
  receiveAvailableSells
} from "../reducers/availbleTrades/availbleTradesActionCreators";

let socket;

const connect = dispatch => {
  socket = io("localhost:4000");
  socket.on("aggregated buys", buys => {
    dispatch(receiveAvailableBuys(buys));
  });
  socket.on("aggregated sells", sells => {
    dispatch(receiveAvailableSells(sells));
  });

  socket.emit("request initial data");
};

export const sendTrade = trade => {
  if (!socket) throw new Error("Not connected - call connect first");

  socket.emit("receive trade", trade);
};

export default connect;