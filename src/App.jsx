import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LoginDetail from "./pages/loginDetail/LoginDetail";
import { ToastContainer } from "react-toastify";
import Layout from "./pages/home/Layout";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase";
import useTheme from "./hooks/useTheme";
import Home from "./component/Home";

function App() {
  const theme = useTheme();
  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    if (theme !== null) {
      setIsDark(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (isDark !== null) {
      setIsDark(isDark);
    }
  }, []);

  const darkModeHandler = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (!auth.currentUser) {
      return;
    }

    try {
      const docRef = doc(db, "User", auth.currentUser.uid);
      await updateDoc(docRef, { isDark: newTheme });
    } catch (error) {
      console.error("Update failed, trying setDoc...", error);
      try {
        const docRef = doc(db, "User", auth.currentUser.uid);
        await setDoc(docRef, { isDark: newTheme }, { merge: true });
      } catch (err) {
        console.error("setDoc also failed", err);
      }
    }
  };

  useEffect(() => {
    if (isDark !== null) {
      document.body.style.backgroundColor = isDark ? "#1c1c1e" : "#f5f5f5";
    }
  }, [isDark]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout isDark={isDark} darkModeHandler={darkModeHandler} />
            }
          >
            <Route index element={<Home isDark={isDark} />} />
          </Route>

          <Route path="/login" element={<Login isDark={isDark} />} />
          <Route path="/logout" element={<LoginDetail isDark={isDark} />} />
          <Route path="/register" element={<Register isDark={isDark} />} />
        </Routes>
        <ToastContainer position="top-center" className="px-3 sm:p-0" />
      </BrowserRouter>
    </>
  );
}

export default App;
