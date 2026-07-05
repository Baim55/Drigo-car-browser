function ResultsCounter({ shown, total }) {
  return (
    <div className="py-3">
      <p className="font-bold">
        Showing {shown} of {total} cars
      </p>
    </div>
  );
}

export default ResultsCounter;
