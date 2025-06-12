import "./App.css";
import UploadModal from "./component/UploadModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LoginDetail from "./pages/loginDetail/LoginDetail";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LoginDetail />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <UploadModal />
        <ToastContainer position="top-center" className="px-3 sm:p-0" />
      </BrowserRouter>
    </>
  );
}

export default App;
