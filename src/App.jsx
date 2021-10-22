import s from './App.module.scss';
import {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from './components/Navigation/Navigation';
import ContactsViews from './pages/ContactsViewPage/ContactsViewPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import {getCurrentUser} from './redux/auth/auth-operations';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <section className={s.App}>
      <Navigation></Navigation>
      <Switch>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/contacts">
          <ContactsViews />
        </PrivateRoute>
      </Switch>
      <ToastContainer />
    </section>
  );
}
