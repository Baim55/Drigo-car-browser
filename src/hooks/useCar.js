import { useState, useEffect, useCallback } from "react";
import { getCar } from "../mockApi/carsApi";

function useCar(id) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    getCar(id)
      .then((result) => {
        setCar(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { car, loading, error, retry: load };
}

export default useCar;