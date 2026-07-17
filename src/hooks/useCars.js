import { useCallback, useEffect, useRef, useState } from "react";
import { getCars } from "../mockApi/carsApi";

function useCars(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const load = useCallback(() => {
    const currentRequestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    getCars(query)
      .then((result) => {
        if (currentRequestId !== requestIdRef.current) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (currentRequestId !== requestIdRef.current) return;
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
