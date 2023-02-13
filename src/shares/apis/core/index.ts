import { axiosDefaultConfig } from './axiosConfigs';
import { CustomAxios } from './CustomAxios';

export const defaultAxiosInstance = new CustomAxios(axiosDefaultConfig);
