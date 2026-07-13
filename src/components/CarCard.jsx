import { FaCar, FaHeart, FaRegHeart, FaRegUser } from "react-icons/fa";
import { TbAutomaticGearbox, TbManualGearbox } from "react-icons/tb";
import { Link } from "react-router-dom";

function CarCard({ car, isFavorite, onToggleFavorite }) {
  const badgeClass = car.available
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  function handleFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(car.id);
  }

  return (
    <Link to={`/cars/${car.id}`} className="block">
      <div className=" rounded-lg p-4 shadow-xl flex flex-col gap-2">
        <div className="relative w-full h-32 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mb-8">
          <FaCar />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 text-red-500 text-lg z-10"
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{car.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>
            {car.available ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <FaCar />
            <span>{car.type}</span>
          </div>{" "}
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            {car.transmission === "Automatic" ? (
              <TbAutomaticGearbox size={20} />
            ) : (
              <TbManualGearbox size={20} />
            )}

            <span>{car.transmission}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegUser />
          <p className="text-sm text-gray-600">{car.seats} seats</p>
        </div>

        <p className="font-bold text-lg mt-2 text-[#0e1f6c]">
          <span className="text-[22px]">${car.pricePerDay}</span>/day
        </p>
      </div>
    </Link>
  );
}

export default CarCard;
