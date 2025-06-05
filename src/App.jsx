import "./App.css";
import UplaodModal from "./component/UplaodModal";
import Home from "./pages/Home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LoginDetail from "./component/LoginDetail";

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
        <UplaodModal />
      </BrowserRouter>
    </>
  );
}

export default App;
