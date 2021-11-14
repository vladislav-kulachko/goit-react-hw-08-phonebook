import {Route, Redirect} from "react-router";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../redux/auth/auth-selectors";

export default function PrivateRoute({children, ...routeProps}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
}
