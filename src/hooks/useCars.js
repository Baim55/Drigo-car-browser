import { useCallback, useEffect, useState } from "react";
import { getCars } from "../api/carsApi";

function useCars() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCars = useCallback(() => {
    setLoading(true);
    setError(null);

    getCars()
      .then((cars) => {
        setData(cars);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  return { data, loading, error, retry: loadCars };
}

export default useCars;
