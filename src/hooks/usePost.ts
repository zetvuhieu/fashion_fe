import { useState } from "react";
import axios from "axios";

interface Data<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  postData: (data: any) => Promise<void>;
}

const usePost = <T>(url: string): Data<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post<T>(url, data);
      setData(response.data);
      setError(null);
      alert("Đăng ký thành công!");
    } catch (error) {
      setError(error as Error);
      alert("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
