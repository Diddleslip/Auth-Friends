import React from 'react';
import './App.css';
import Form from "./components/Form";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/Protected Page">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={FriendsList}/>
          <Route path="/login" component={Form}/> 
          <Route component={Form}/> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
