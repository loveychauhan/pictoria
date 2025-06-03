import "./App.css";
import UplaodModal from "./component/UplaodModal";
import Home from "./pages/Home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <UplaodModal />
      </BrowserRouter>
    </>
  );
}

export default App;
