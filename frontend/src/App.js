import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";


import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import login from "./components/Home/login";
import register from './components/Home/register';
import Navbar from "./components/Home/navbar";
import Footer from "./components/Home/footer";

function App() {
  return (
    <Router>
        <Navbar/>
        <Route path="/login" component={login}/>
        <Route path="/register" component={register}/>
        <Footer/>
    </Router>
  )
}

export default App;
