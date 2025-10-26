import React, { useState, useEffect, useRef, useContext } from "react";
import { createSocketConnection } from "./socket";
import Login from "./Login";
import { UserContext, } from "./UserContext";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Register from "./Register";
import ChatScreen from "./ChatScreen";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";

function App() {
  
  const { loggedinUser, loading } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedinUser={loggedinUser} loading={loading}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:to/:from"
          element={
            <ProtectedRoute loggedinUser={loggedinUser} loading={loading}>
              <ChatScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
