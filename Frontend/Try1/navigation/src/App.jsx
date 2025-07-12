import React from "react";
import {Routes, Route} from 'react-router-dom'
import AuthForm from "./Pages/registrationLogin-Page.jsx";
import ForgotPassword from "./Pages/forgotPassword-Page.jsx";
import AdminPage from "./Pages/Admin-Page";
import { useState } from "react";

function App() {
  return (
    
      <Routes>
        <Route path= "/" element={<AuthForm/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
  );
}

export default App
