function EmptyState({ onReset }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 mb-4">No caes match your filters.</p>
      <button
        onClick={onReset}
        className="border rounded-2xl px-3 py-2 hover:bg-gray-100"
      >
        Reset filters
      </button>
    </div>
  );
}

export default EmptyState;
