import { Switch } from "react-router-dom";
import Route from "./route";
// import useLocalStorage from "use-local-storage";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
       
      <Route path="/login" component={Login} />

      <Route path="/signup" component={Register} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
