import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
// import useLocalStorage from "use-local-storage";
import { LandingPage } from "../pages/LandingPage";
import { Dashboard } from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => {
  return (
    <Switch>
      {/* <Route>
        <LandingPage />
      </Route> */}
      <Route exact path="/">
        <Login />
      </Route>

      {/* <Route>
        <Register />
      </Route>
      <Route>
        <Dashboard />
      </Route> */}
    </Switch>
  );
};

export default Routes;
