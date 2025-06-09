import "./App.css";
import UploadModal from "./component/UploadModal";
import Home from "./pages/Home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LoginDetail from "./pages/loginDetail/LoginDetail";
import { ToastContainer } from "react-toastify";

function App() {
  console.log("hello app");
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
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
