import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import { reducer as authReducer} from '../../reducers/auth';
import {thunk} from 'redux-thunk';
import {logger} from 'redux-logger';

const initState = {};
const rootReducer = combineReducers({
    auth: authReducer,
})
const store = legacy_createStore(rootReducer, initState, applyMiddleware(thunk, logger));
export default store;