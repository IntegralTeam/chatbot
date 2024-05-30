import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from '@/appConstants';

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
});

export * from './chat';
