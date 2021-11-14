import s from "./App.module.scss";
import {useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Navigation from "./components/Navigation/Navigation";
import ContactsViews from "./pages/ContactsViewPage/ContactsViewPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {getCurrentUser} from "./redux/auth/auth-operations";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import {getIsLoggedIn, getUserFetching} from "./redux/auth/auth-selectors";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const fetchingUser = useSelector(getUserFetching);
  const isLoggedIn = useSelector(getIsLoggedIn);
  useEffect(() => {
    fetchingUser ? setProgress(10) : setProgress(100);
  }, [fetchingUser]);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <section className={s.App}>
      <Navigation></Navigation>
      <Switch>
        <PublicRoute path="/registration" restricted>
          <RegistrationPage />
        </PublicRoute>
        <PublicRoute path="/login" restricted>
          <LoginPage />
        </PublicRoute>
        <PrivateRoute path="/contacts">
          <ContactsViews />
        </PrivateRoute>
        <Route>
          {isLoggedIn ? <Redirect to="/contacts" /> : <Redirect to="login" />}
        </Route>
      </Switch>
      <ToastContainer style={{width: "inherit"}} />
      <LoadingBar color="gray" height={5} progress={progress} />
    </section>
  );
}
