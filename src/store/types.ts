export const GET_LAUNCHES = 'GET_LAUNCHES';
export const DATA_LOADING = 'LOADING';
export const FILTER_LAUNCHES = 'FILTER_LAUNCHES';
export const SORT_LAUNCHES = 'SORT_LAUNCHES';
export const RESET_LAUNCH = 'RESET_LAUNCH';

type GetLaunch = {
	type: typeof GET_LAUNCHES;
	payload: any;
};

type SortLaunch = {
	type: typeof SORT_LAUNCHES;
	payload: any;
};

type FilterLaunch = {
	type: typeof FILTER_LAUNCHES;
	payload: any;
};
type DataLoading = {
	type: typeof DATA_LOADING;
	payload: boolean;
};
type Resetlaunch = {
	type: typeof RESET_LAUNCH;
};

export type LaunchActionTypes =
	| GetLaunch
	| SortLaunch
	| FilterLaunch
	| DataLoading
	| Resetlaunch;
