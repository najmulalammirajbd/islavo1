import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Redy from './components/Redy/Redy';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ClickNow from './components/ClickNow/ClickNow';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ThankYou from './components/ThankYou/ThankYou';



export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/" >
            <Login></Login>
          </Route>
          <Route path="/login" >
            <Login></Login>
          </Route>
          <PrivateRoute path="/redy">
            <Redy></Redy>
          </PrivateRoute>
          <PrivateRoute path="/clicknow">
            <ClickNow></ClickNow>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/resetpassword">
            <ResetPassword></ResetPassword>
          </Route>
          <Route path="/thankyou">
            <ThankYou></ThankYou>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
