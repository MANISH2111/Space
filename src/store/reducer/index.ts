
import { combineReducers } from 'redux'
import  LaunchReducer from './launchReducer'

const rootReducer = combineReducers({
    launchReducer: LaunchReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export { rootReducer}