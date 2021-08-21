import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";

import NavBar from "./components/Navbar";
import {UserProvider} from './userContext'
import Profile from './pages/profile'
import Container from '@material-ui/core/Container'
import Activity from "./pages/activity";

function App() {
 const [user, setUser] = useState({
   email: localStorage.getItem('email'),
   isAdmin: JSON.parse(localStorage.getItem('isAdmin'))
 })
 function unsetUser(){
   localStorage.clear()
 }
  return (
    <>
      <UserProvider value ={{user, setUser, unsetUser}}>
        <Router>
        <NavBar />
          <Switch>
          <Route exact path='/profile' component={Profile}></Route>
          <Route exact path ='/activity' component={Activity}></Route>
          </Switch>
            
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
