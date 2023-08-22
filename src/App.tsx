import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Colors } from './constants/Colors';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App" style={{backgroundColor:Colors.addson, height:"100vh"}}>
      <LoginPage />
    </div>
  );
}

export default App;
