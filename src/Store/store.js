import combinedReducer from './Reducers/combinedReducer';
import { applyMiddleware, createStore } from 'redux'
import { thunk } from 'redux-thunk';

const store = createStore(combinedReducer, applyMiddleware(thunk));

export default store;