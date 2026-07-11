function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-900 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">Loading cars...</p>
    </div>
  );
}

export default LoadingState;
