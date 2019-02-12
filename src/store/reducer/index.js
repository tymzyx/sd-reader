import test from './test';
import user from './user';
import { combineReducers } from 'redux';

const reducers = combineReducers({ test, user });
export default reducers;
