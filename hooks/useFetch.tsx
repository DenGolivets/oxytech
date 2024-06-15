import { useEffect, useState } from "react";
import { getDataFromApi } from "./getDataBeatport";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
      setLoading("loading...");
      setData(null);
      setError(null);

      getDataFromApi(url)
          .then((res) => {
              setLoading('');
              setData(res);
          })
          .catch((err) => {
              setLoading('');
              setError(error);
          });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;