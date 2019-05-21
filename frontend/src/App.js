import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import login from "./components/Home/login";
import register from './components/Home/register';


function App() {
  return (
    <Router>
        <Route path="/login" component={login}/>
        <Route path="/register" component={register}/>
    </Router>
  )
}

export default App;
