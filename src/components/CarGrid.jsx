import CarCard from "./CarCard";

function CarGrid({ cars, isFavorite, onToggleFavorite }) {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isFavorite={isFavorite(car.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default CarGrid;
