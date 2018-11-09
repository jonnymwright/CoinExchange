import { combineReducers } from 'redux';
import user from './user/userReducers';
import recentTrades from './recentTrades/recentTradesReducer';
import availableTrades from './availbleTrades/availbleTrades';
import myTrades from './myTrades/myTrades';


const rootReducer = combineReducers({ 
    user,
    myTrades,
    availableTrades,
    recentTrades
});

export default rootReducer;