import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Toaster from "./components/Toaster";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Walkthrough from "./pages/Walkthrough";
import Journal from "./pages/Journal";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-background text-foreground transition-colors duration-300">
        <BrowserRouter>
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/walkthrough/:id" element={<Walkthrough />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </BrowserRouter>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;