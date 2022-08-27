import {
    GET_LAUNCHES,
    LAUNCH_ERROR,
} from '../types';

import axios, { AxiosResponse } from 'axios';

import { Dispatch } from 'redux';



export const getLaunches = () => async (dispatch:Dispatch) => {
    try {
        const res:AxiosResponse = await axios.get(`https://api.spacexdata.com/v3/launches`);

        dispatch({
            type: GET_LAUNCHES,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: LAUNCH_ERROR,
        });
    }
};

