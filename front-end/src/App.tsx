import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BorrowPage from "./pages/BorrowPage/BorrowPage";
import Header from "./components/Header/Header";
import FaucetPage from "./pages/FaucetPage/FaucetPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-bl from-sky-900 to-blue-100">
        <Header />
        <div className="pt-[80px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/borrow" element={<BorrowPage />} />
            <Route path="/faucet" element={<FaucetPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
