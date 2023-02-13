import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
// import eventBus from 'src/socket/event-bus';
import { axiosDefaultConfig } from 'src/shares/apis/core/axiosConfigs';
import { getStorageJwtToken } from 'src/shares/helpers/storageHelper';

// interface Dict<T> {
//   [key: string]: T;
//   [key: number]: T;
// }

interface ResultData {
  data: any;
  metadata: any;
}

// export interface ChangeListener {
//   (event: any): any;
// }

export class CustomAxios {
  private axiosInstance: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig) {
    this.axiosInstance = axios.create(axiosConfig);

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const tokenAccess = getStorageJwtToken();
        config.headers.Authorization = 'Bearer ' + tokenAccess;
        return config;
      }, (error) => {
        return Promise.reject(error);
      });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          // removeStorageJwtToken();
          // eventBus.dispatch(`access_token_expired`, null);
          // return window.location.reload();
          // return window.location.replace(window.location.origin);
        }
        return Promise.reject(error);
      },
    );
  }

  // private onChangeListeners: Dict<ChangeListener> = {};

  getResultData = (response: AxiosResponse) => {
    const data = response?.data.data;
    const metadata = response.data?.metadata;
    return { data, metadata };
  };

  async get(url: string, params?: any): Promise<ResultData> {
    const response = await this.axiosInstance.get(url, { params });
    return this.getResultData(response);
  };

  async put(url: string, data: any): Promise<ResultData> {
    const response = await this.axiosInstance.put(url, data);
    return this.getResultData(response);
  };

  async patch(url: string, data: any): Promise<ResultData> {
    const response = await this.axiosInstance.patch(url, data);
    return this.getResultData(response);
  };

  async post(url: string, params: any): Promise<ResultData> {
    const response = await this.axiosInstance.post(url, params);
    return this.getResultData(response);
  };

  async delete(url: string, id: number): Promise<ResultData> {
    const response = await this.axiosInstance.delete(`${url}/${id}`);
    return this.getResultData(response);
  };

  async deleteByUrl(url: string): Promise<ResultData> {
    const response = await this.axiosInstance.delete(url);
    return this.getResultData(response);
  };

  async update(url: string, id: number | undefined, params: any): Promise<ResultData> {
    const response = await this.axiosInstance.patch(`${url}/${id}`, params);
    return this.getResultData(response);
  };

  // subscribe(key: string, listener: ChangeListener) {
  //   if (this.onChangeListeners[key]) return;
  //   this.onChangeListeners[key] = listener;
  // }

  // unsubcribe(key: string) {
  //   delete this.onChangeListeners[key];
  // }

  // fire(data: any) {
  //   Object.values(this.onChangeListeners).forEach((listener) => listener(data));
  // }
}