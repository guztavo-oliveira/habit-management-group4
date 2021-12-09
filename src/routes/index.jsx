import { Route, Switch } from "react-router-dom";
// import useLocalStorage from "use-local-storage";
// import { LandingPage } from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => {
  return (
    <Switch>
      {/* <Route>
        <LandingPage />
      </Route> */}
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default Routes;
