import { defaultAxiosInstance } from './core/index';

export const getTaskList = async () => {
  const res = await defaultAxiosInstance.get('/tasks');
  return res;
}