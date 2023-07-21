import { Route, Routes } from "react-router-dom";
import "./App.css";
import SaleViewer from "./pages/sale-viewer";
import Login from "./pages/login/Login";
import Header from "./layout/header";
import SearchResult from "./pages/search";
import AddToolkit from "./pages/add-toolkit";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SaleViewer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/add-toolkit" element={<AddToolkit />} />
      </Routes>
    </div>
  );
}

export default App;
