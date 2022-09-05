
import moment from 'moment';
import { DATA_LOADING, FILTER_LAUNCHES, GET_LAUNCHES, LaunchActionTypes, SORT_LAUNCHES} from '../types';

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
            };
            case SORT_LAUNCHES:
                const sortObj = action.payload;
                let sortData = [...state.filteredLaunches];
                if (sortObj.sort === 'name') {
                    sortData = sortData.sort((a, b) =>
                        a.mission_name.localeCompare(b.mission_name)
                    );
                } else if (sortObj.sort === 'date') {
                    sortData = sortData.sort(function (left, right) {
                        return moment
                            .utc(left.launch_date_utc)
                            .diff(moment.utc(right.launch_date_utc));
                    });
                }
                return {
                    ...state,
                    filteredLaunches: sortData,
                    loading: false,
                };
                // case FILTER_LAUNCHES:
                //     const filterRocket=action.payload
                //     console.log('AAAAAAAAAAAAAA',filterRocket)

                //     let filterRocketData=[...state.filteredLaunches];
               
                //     const x=filterRocket.rockets.length
                //     if(x>0){
                //     //  return filterRocketData.filter(item=>filterRocket.rocket .every((x: any)=>item.rocket.rocket_name===x))
                //    return filterRocket.rockets.map((x: any) => {
                //         filterRocketData.filter(y=>y.rocket.rocket_name===x)
                //     });
                
                //     }
                //     return{
                //         ...state,
                //         filteredLaunches: filterRocketData,
                //         loading: false,
                //     }
            
        default:
            return state;
    }
}