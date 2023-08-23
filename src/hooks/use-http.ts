import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: any | null;
  fetchData: (
    url: string,
    method: Method,
    options?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
}

const useHttp = <T>(): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const fetchData = async (
    url: string,
    method: Method,
    options?: AxiosRequestConfig
  ) => {
    setLoading(true);
    try {
      const response = await axios({
        url,
        method,
        ...options,
      });

      setData(response.data);
      setError(null);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useHttp;
