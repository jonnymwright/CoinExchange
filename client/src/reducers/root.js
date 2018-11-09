import { combineReducers } from 'redux';
import user from './user/userReducers';
import recentTrades from './recentTrades/recentTradesReducer';
import availableTrades from './availbleTrades/availbleTrades';


const rootReducer = combineReducers({ 
    user,
    availableTrades,
    recentTrades
});

export default rootReducer;