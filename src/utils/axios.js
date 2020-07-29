import axios from 'axios';
import ApiRoutes from './api';

const AxiosInstance = axios.create();

AxiosInstance.defaults.baseURL = ApiRoutes.baseUrl;


export default AxiosInstance;
