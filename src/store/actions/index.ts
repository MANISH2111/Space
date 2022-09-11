import {
	DATA_LOADING,
	GET_LAUNCHES,
	FILTER_LAUNCHES,
	SORT_LAUNCHES,
	RESET_LAUNCH,
} from '../types';
import { Api } from '../../Api';

import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';

export const getLaunches = () => async (dispatch: Dispatch) => {
	try {
		dispatch(setLoading(true));
		const res: AxiosResponse = await Api.get('/launches');
		dispatch(getAllLaunches(res.data));
	} catch (error) {
		console.log('eee', error);
	} finally {
		dispatch(setLoading(false));
	}
};

export const setLoading = (payload: boolean) => ({
	type: DATA_LOADING,
	payload,
});

export const getAllLaunches = (payload: any) => ({
	type: GET_LAUNCHES,
	payload,
});

export const filterLaunches = (payload: any) => ({
	type: FILTER_LAUNCHES,
	payload,
});

export const sortLaunches = (payload: any) => ({
	type: SORT_LAUNCHES,
	payload,
});

export const resetLaunches = () => ({
	type: RESET_LAUNCH,
});
