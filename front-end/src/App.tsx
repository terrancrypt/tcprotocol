import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BorrowPage from "./pages/BorrowPage/BorrowPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-6 sm:px-8 2xl:px-0">
        <Header />
        <div className="pt-[80px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/borrow" element={<BorrowPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
