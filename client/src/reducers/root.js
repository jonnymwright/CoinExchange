import { combineReducers } from 'redux';
import user from './user/userReducers';
import recentTrades from './recentTrades/recentTradesReducer';


const rootReducer = combineReducers({ 
    user,
    recentTrades
});

export default rootReducer;