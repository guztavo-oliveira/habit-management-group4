import { Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

const Route = ({ isPrivate = false, component: Component, ...rest }) => {
  const { access } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!access ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? "/login" : "/dashboard"} />
        );
      }}
    />
  );
};

export default Route;