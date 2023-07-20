import { Route, Routes } from "react-router-dom";
import "./App.css";
import SaleViewer from "./pages/sale-viewer";
import Login from "./pages/login/Login";
import Header from "./layout/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SaleViewer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
