import moment from 'moment';
import {
	DATA_LOADING,
	FILTER_LAUNCHES,
	GET_LAUNCHES,
	LaunchActionTypes,
	RESET_LAUNCH,
	SORT_LAUNCHES,
} from '../types';

type InitialState = {
	launches: any;
	filteredLaunch: any;
	loading: boolean;
};

const initialState: InitialState = {
	launches: [],
	filteredLaunch: [],
	loading: true,
};

export default function (state = initialState, action: LaunchActionTypes) {
	switch (action.type) {
		case GET_LAUNCHES:
			return {
				...state,
				launches: action.payload,
				filteredLaunch: action.payload,
			};
		case DATA_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case SORT_LAUNCHES:
			const sortObj = action.payload;

			let sortData = [...state.filteredLaunch];

			if (sortObj.sort === 'name') {
				sortData = sortData.sort((a, b) =>
					a.mission_name.localeCompare(b.mission_name),
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
				filteredLaunch: sortData,
				loading: false,
			};
		case FILTER_LAUNCHES:
			const filter = action.payload;
			const filterRocket = filter.rockets;
			const filterUpcoming = filter.upcoming;
			const filterSuccess = filter.success;
			const filterDate = filter.time;

			let filterRocketData = [...state.launches];

			// no use of the code
			if (filterRocket.length === 0) {
				filterRocketData;
			} else {
				filterRocketData = filterRocket
					.map((z: any) =>
						filterRocketData.filter(
							(y) => y.rocket.rocket_name === z,
						),
					)
					.flat();
			}

			if (filterUpcoming.length !== 1) {
				filterRocketData;
			} else {
				if (filterUpcoming.includes('Upcoming'))
					filterRocketData = filterRocketData
						.filter((x) => x.upcoming === true)
						.flat();
				else {
					filterRocketData = filterRocketData
						.filter((x) => x.upcoming === false)
						.flat();
				}
			}

			if (filterSuccess.length !== 1) {
				filterRocketData;
			} else {
				if (filterSuccess.includes('Success')) {
					filterRocketData = filterRocketData
						.filter((t) => t.launch_success === true)
						.flat();
					console.log('DATATATATA', filterRocketData);
				} else {
					filterRocketData = filterRocketData
						.filter((p) => p.launch_success === false)
						.flat();
				}
			}
			if (filterDate.StartDate) {
				filterRocketData = filterRocketData.filter((x) =>
					moment(x.launch_date_local).isAfter(filterDate.StartDate),
				);
			}
			if (filterDate.EndDate) {
				filterRocketData = filterRocketData.filter((x) =>
					moment(x.launch_date_local).isBefore(filterDate.EndDate),
				);
			}

			return {
				...state,
				filteredLaunch: filterRocketData,
				loading: false,
			};

		case RESET_LAUNCH:
			return {
				...state,
				filteredLaunch: state.launches,
			};
		default:
			return state;
	}
}
