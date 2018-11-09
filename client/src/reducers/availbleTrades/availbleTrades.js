import { combineReducers } from 'redux';
import buys from './buys';
import sells from './sells';

const availbleTrades = combineReducers({
    buys, 
    sells
});

export default availbleTrades