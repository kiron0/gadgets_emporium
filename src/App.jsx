import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Pages/Shared/Navbar/Navbar";
import Home from "./Components/Pages/Home/Home/Home";
import NotFound from "./Components/Pages/Shared/NotFound/NotFound";
import { useEffect, useState } from "react";
import Login from "./Components/Pages/Login/Login/Login";
import SignUp from "./Components/Pages/Login/SignUp/SignUp";
import ResetPassword from "./Components/Pages/Login/ResetPassword";
import Team from "./Components/Pages/Team/Team";
import Dashboard from "./Components/Pages/Dashboard/Dashboard/Dashboard";

function App() {
  const [theme, setTheme] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setTheme(JSON.parse(window.localStorage.getItem("theme")));
  }, []);

  const handleThemeChange = () => {
    setTheme(!theme);
    window.localStorage.setItem("theme", !theme);
  };

  return (
    <div data-theme={theme && "night"} className="App">
      {loading ? (
        <div id="preloader">
          <div id="loader"></div>
        </div>
      ) : (
        <Navbar handleThemeChange={handleThemeChange} theme={theme} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard handleThemeChange={handleThemeChange} theme={theme} />
          }
        />
        <Route path="/team" element={<Team />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
