import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  isAxiosError,
  isCancel,
} from 'axios';
import { useEffect, useState } from 'react';
export const useAxios = <DataReturnedType = unknown>(
  requestConfig: AxiosRequestConfig,
  axiosInstance?: AxiosInstance
) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [responseData, setResponseData] = useState<DataReturnedType | null>(
    null
  );
  const [refetchId, setRefechId] = useState(0);
  const refetch = () => setRefechId((prevRefetchId) => prevRefetchId + 1);
  useEffect(() => {
    const abortController = new AbortController();
    const executeAxiosRequest = async () => {
      try {
        setIsFetching(true);
        requestConfig.signal = abortController.signal;
        const { data } = await (axiosInstance
          ? axiosInstance<DataReturnedType>(requestConfig)
          : axios.request(requestConfig));
        setResponseData(data);
        setError(undefined);
      } catch (e) {
        if (isAxiosError(e) && !isCancel(e)) {
          setError(e);
        }
      } finally {
        setIsFetching(false);
      }
    };
    executeAxiosRequest();
    return () => {
      abortController.abort('cancelled');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestConfig.url, axiosInstance, refetchId]);
  return {
    responseData,
    isFetching,
    error,
    refetch,
  };
};
