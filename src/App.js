import { Route, Routes } from "react-router-dom";
import "./App.css";
import SaleViewer from "./pages/sale-viewer";
import Login from "./pages/login/Login";
import Header from "./layout/header";
import SearchResult from "./pages/search";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SaleViewer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/serach" element={<SearchResult />} />
      </Routes>
    </div>
  );
}

export default App;
