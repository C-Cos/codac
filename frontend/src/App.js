import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import login from "./components/login";


function App() {
  return (
    <Router>
        <Route path="/login" component={login}/>
    </Router>
  )
}

export default App;
