import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightsPage from "./pages/FlightsPage";

function App() {
  return (
    <div className="text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/flights" element={<FlightsPage />} />
      </Routes>
    </div>
  );
}

export default App;
