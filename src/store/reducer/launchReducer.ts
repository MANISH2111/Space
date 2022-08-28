
import { DATA_LOADING, GET_LAUNCHES, LaunchActionTypes} from '../types';

type InitialState={
    launches:any,
    filteredLaunches:any,
    loading:boolean
}

const initialState:InitialState = {
    launches: [],
    filteredLaunches: [],
    loading: true,
};


export default function (state = initialState, action: LaunchActionTypes) {
    switch (action.type) {
        case GET_LAUNCHES:
            return {
                ...state,
                launches: action.payload,
                filteredLaunches: action.payload,
               
            };
        case DATA_LOADING:
            return{
                ...state,
                loading:action.payload
            }
        default:
            return state;
    }
}