import { useState, useEffect, useCallback } from "react";
import AxiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

/**
 * A generic custom hook to fetch data using Axios.
 * @param route The API endpoint to fetch data from.
 * @returns An object containing loading state, fetched data, and error state.
 */
export const useAxios = <T>(route: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setData(null);
    setError(null);
    
    try {
      const response = await AxiosInstance.get<T>(route);
      setData(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [route]);

  useEffect(() => {
    fetchData();
  }, [route, fetchData]);

  return { loading, data, error, refetch: fetchData };
};