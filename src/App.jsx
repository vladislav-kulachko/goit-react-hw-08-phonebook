import s from './App.module.scss';

import {Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from './components/Navigation/Navigation';
import ContactsViews from './pages/ContactsViewPage/ContactsViewPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';

export default function App() {
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
        <Route path="/contacts">
          <ContactsViews />
        </Route>
      </Switch>
      <ToastContainer />
    </section>
  );
}
