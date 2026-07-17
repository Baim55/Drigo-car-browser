import { useCallback, useEffect, useState } from "react";
import { getCars } from "../mockApi/carsApi";

function useCars(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    getCars(query)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(query)]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, retry: load };
}

export default useCars;
