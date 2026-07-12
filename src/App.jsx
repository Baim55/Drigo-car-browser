import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";

function App() {
  return (
    <div className="mb-5">
      <Header />
      <Routes>
        <Route path="/" element={<CarListPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
