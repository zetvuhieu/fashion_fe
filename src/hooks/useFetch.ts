import { useState, useEffect } from "react";
import axios from "axios";

interface Data<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(url: string): Data<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
