
import { combineReducers } from 'redux'
import  LaunchReducer from './launchReducer'

const rootReducer = combineReducers({
    launch: LaunchReducer
})


export { rootReducer}