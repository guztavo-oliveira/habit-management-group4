import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { LandingPage } from "../pages/LandingPage";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

function Routes() {
  return (
    <Switch>
      <Route>
        <LandingPage />
      </Route>
      <Route>
        <Login />
      </Route>
      <Route>
        <Register />
      </Route>
      <Route>
        <Dashboard />
      </Route>
    </Switch>
  );
}

export default Routes;
