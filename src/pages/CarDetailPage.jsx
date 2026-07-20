import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import {
  FaCar,
  FaRegUser,
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { TbAutomaticGearbox, TbManualGearbox } from "react-icons/tb";
import useFavorites from "../hooks/useFavorites";
import useCar from "../hooks/useCar";

function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { car, loading, error, retry } = useCar(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  function handleFavoriteClick(e) {
    e.preventDefault();
    toggleFavorite(car.id);
  }

  if (error) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[400px] text-center">
        <FaCar size={40} className="text-gray-400 mb-3" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Car not found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find a car with id "{id}".
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Back to all cars
        </button>
      </div>
    );
  }

  const badgeClass = car.available
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <div className="container px-3 md:px-0">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-900 font-medium mb-6 transition"
      >
        <FaArrowLeft size={14} />
        Back to all cars
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-4xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="w-full h-64 md:h-full bg-gray-100 flex items-center justify-center text-7xl relative">
            <FaCar />
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 text-red-500 text-2xl z-10"
            >
              {isFavorite(car.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <div className="p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{car.name}</h1>
                <p className="text-gray-500 text-sm mt-1">{car.type}</p>
              </div>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${badgeClass}`}
              >
                {car.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                  {car.transmission === "Automatic" ? (
                    <TbAutomaticGearbox size={22} />
                  ) : (
                    <TbManualGearbox size={22} />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Transmission</p>
                  <p className="font-semibold">{car.transmission}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                  <FaRegUser size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Seats</p>
                  <p className="font-semibold">{car.seats} seats</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                  <FaCar size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-semibold">{car.type}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto bg-gray-50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Price per day</p>
                <p className="text-3xl font-bold text-[#0e1f6c]">
                  ${car.pricePerDay}
                  <span className="text-sm font-normal text-gray-500">
                    /day
                  </span>
                </p>
              </div>
              <div>
                <Link
                  to={`/cars/${car.id}/book`}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                >Book now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailPage;
