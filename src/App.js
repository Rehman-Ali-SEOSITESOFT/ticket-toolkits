import { Route, Routes } from "react-router-dom";
import "./App.css";
import SaleViewer from "./pages/sale-viewer";
import Login from "./pages/login/Login";
import Header from "./layout/header";
import SearchResult from "./pages/search";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname === "/" ? null : <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sales-view" element={<SaleViewer />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </div>
  );
}

export default App;
