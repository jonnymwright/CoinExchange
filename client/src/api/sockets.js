import io from 'socket.io-client';
import { receiveAvailableBuys, receiveAvailableSells } from '../reducers/availbleTrades/availbleTradesActionCreators'

const connect = (dispatch) => {
    const socket = io("localhost:4000");
    socket.on("aggregated buys", (buys) => {
        dispatch(receiveAvailableBuys(buys));
    });
    socket.on("aggregated sells", (sells) => {
        dispatch(receiveAvailableSells(sells))
    });

    socket.emit("request initial data");
}

export default connect;