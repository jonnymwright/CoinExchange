import { combineReducers } from 'redux';
import user from './users/userReducers';


const rootReducer = combineReducers({ 
    user
});

export default rootReducer;