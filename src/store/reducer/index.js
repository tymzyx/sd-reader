import test from './test';
import user from './user';
import common from './common';
import { combineReducers } from 'redux';

const reducers = combineReducers({ test, user, common });
export default reducers;
