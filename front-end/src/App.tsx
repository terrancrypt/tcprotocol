import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BorrowPage from "./pages/BorrowPage/BorrowPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/borrow" element={<BorrowPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
