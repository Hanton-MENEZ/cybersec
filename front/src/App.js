import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import useToken from './components/tokenHandler';

// pages import
import Dashboard from ".//pages/dashboard";
import Login from './pages/login';
import Model from './pages/model'
import Component from './pages/component';
import Recipe from './pages/recipe'
import Navbar from ".//components/navbar";
//style import
import './style/App.css';


function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Navbar className="navigation"></Navbar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/models" element={<Model />} />
        <Route path="/components" element={<Component />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </div>
  );
}

export default App;
