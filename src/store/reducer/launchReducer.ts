import { GET_LAUNCHES} from '../types';

const initialState = {
    launches: [],
    filteredLaunches: [],
    loading: true,
};


export default function (state = initialState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case GET_LAUNCHES:
            return {
                ...state,
                launches: action.payload,
                filteredLaunches: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}