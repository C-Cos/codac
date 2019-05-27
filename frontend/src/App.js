import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

import login from "./components/Home/login";
import register from './components/Home/register';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import home from "./components/Home/home";
import UserProfile from "./components/Profile/UserProfile";
import addEvent from "./components/Event/AddEvent";
import events from "./components/Event/DisplayEvents";
import event from "./components/Event/DisplayOneEvent";


function App() {
  return (
    <Router>
        <Navbar/>
        <Route exact path="/" component={home}/>
        <Route path="/login" component={login}/>
        <Route path="/register" component={register}/>
        <Route path="/profile" component={UserProfile}/>
        <Route path="/addevent" component={addEvent}/>
        <Route path="/events" component={events}/>
        <Route path="/event/" component={event}/>
        <Footer/>
    </Router>
  )
}

export default App;
