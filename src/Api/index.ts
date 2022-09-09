import axios from 'axios';

let Api = axios.create({
	baseURL: 'https://api.spacexdata.com/v3',
	responseType: 'json',
	timeout: 25 * 1000,
});

export { Api };
