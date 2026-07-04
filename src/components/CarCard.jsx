function CarCard({ car }) {
  const badgeClass = car.available
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{car.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>
          {car.available ? "Available" : "Unavailable"}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        {car.type} · {car.transmission}
      </p>
      <p className="text-sm text-gray-600">{car.seats} seats</p>

      <p className="font-bold text-lg mt-2">${car.pricePerDay}/day</p>
    </div>
  );
}

export default CarCard;
