import axios from 'axios'
import { interceptorLoadingElements } from './fomatters';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

axiosClient.interceptors.request.use(function (config) {
  interceptorLoadingElements(true)

  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use(function (response) {
  interceptorLoadingElements(false)
  return response;
}, function (error) {
  interceptorLoadingElements(false)
  let errorMessage = error.message

  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }
  return Promise.reject(error);
})

export default axiosClient
