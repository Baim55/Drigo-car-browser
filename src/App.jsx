import CarGrid from "./components/CarGrid";
import cars from "./data/cars.json";

function App() {
  return (
    <>
      <CarGrid cars={cars} />
    </>
  );
}

export default App;
