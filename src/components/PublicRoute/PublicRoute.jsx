import {Route, Redirect} from 'react-router';
import {useSelector} from 'react-redux';
import {getIsLoggedIn} from '../../redux/auth/auth-selectors';

export default function PublicRoute({
  children,
  restricted = false,
  ...routeProps
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRedirect = isLoggedIn && restricted;
  return (
    <Route {...routeProps}>
      {isRedirect ? <Redirect to="/contacts" /> : children}
    </Route>
  );
}
