import { FaCar } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";

function EmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
      <FaCar size={40} className="text-gray-500 mb-3" />

      <h3 className="text-xl font-semibold text-gray-800">
        Can't find what you're looking for?
      </h3>

      <p className="text-gray-600 mt-2 mb-6">
        Try adjusting your filters or search terms.
      </p>

      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
      >
        <RiResetLeftLine />
        <span>Reset Filters</span>
      </button>
    </div>
  );
}

export default EmptyState;
