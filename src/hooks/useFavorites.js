import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "favoriteCarİds";

function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = useCallback((carId) => {
    setFavoriteIds((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId],
    );
  }, []);

  const isFavorite = useCallback(
    (carId) => favoriteIds.includes(carId),
    [favoriteIds],
  );
  return { favoriteIds, toggleFavorite, isFavorite };
}

export default useFavorites;
