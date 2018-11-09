import { combineReducers } from 'redux';
import buys from './buys';
import sells from './sells';

const myTrades = combineReducers ({
    buys,
    sells
});
export default myTrades;