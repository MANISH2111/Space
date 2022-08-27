import {  legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk  from 'redux-thunk'
import {createLogger} from 'redux-logger'
import { rootReducer } from './reducer'

const initialState = {};

const logger = createLogger();

const store = createStore(rootReducer,
                          initialState, 
                          applyMiddleware(thunk,logger))

export { store };