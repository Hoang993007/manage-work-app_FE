import { AxiosRequestConfig } from 'axios';

export const axiosDefaultConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: Number(process.env.REACT_APP_API_TIMEOUT) | 5000,
    transformRequest: [
      (data, headers) => {
        if (data instanceof FormData) {
          if (headers) {
            delete headers['Content-Type'];
          }
          return data;
        }
        return JSON.stringify(data);
      },
    ],
}