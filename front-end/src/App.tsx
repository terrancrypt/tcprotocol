import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BorrowPage from "./pages/BorrowPage/BorrowPage";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import {
  CollateralInfo,
  getAllCollateralList,
} from "./services/collateralRenderServices";
import { sepolia } from "wagmi";
import { optimismGoerli, polygonMumbai } from "wagmi/chains";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { addCollateralList } from "./redux/slices/collateralSlice";
import FaucetPage from "./pages/FaucetPage/FaucetPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

function App() {
  const dispatch = useDispatch();

  const fetchCollateralList = async () => {
    try {
      const chains = [sepolia, optimismGoerli, polygonMumbai];
      const result: CollateralInfo | null = await getAllCollateralList(chains);
      if (result == null) return null;
      dispatch(addCollateralList(result));
    } catch (error) {
      message.error("Can't not fetch collateral list!");
    }
  };

  useEffect(() => {
    fetchCollateralList();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-bl from-sky-900 to-blue-100">
        <Header />
        <div className="pt-[80px] container mx-auto px-6 sm:px-8 2xl:px-0">
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
