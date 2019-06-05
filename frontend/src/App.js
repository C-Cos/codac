import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import login from "./components/Home/login";
import register from './components/Home/register';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import home from "./components/Home/home";
import userProfile from "./components/Profile/UserProfile";
import addEvent from "./components/Event/AddEvent";
import EditEvent from "./components/Event/EditEvent";
import events from "./components/Event/DisplayEvents";
import event from "./components/Event/DisplayOneEvent";
import EditUser from "./components/Profile/EditUser";


function App() {
  return (
    <Router>
        <Navbar/>
        <Route exact path="/" component={home}/>
        <Route path="/login" component={login}/>
        <Route path="/register" component={register}/>
        <Route path="/profile" component={userProfile}/>
        <Route path="/addevent" component={addEvent}/>
        <Route path="/events" component={events}/>
        <Route path="/event/:id" component={event}/>
        <Route path="/editevent/:id" component={EditEvent}/>
        <Route path="/edituser" component={EditUser}/>
        <Footer/>
    </Router>
  )
}

export default App;
