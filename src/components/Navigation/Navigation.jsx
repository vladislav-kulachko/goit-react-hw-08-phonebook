import {NavLink} from 'react-router-dom';
import s from './Navigation.module.scss';

export default function Navigation() {
  return (
    <nav className={s.navigation}>
      <NavLink
        className={s.link}
        activeClassName={s.linkActive}
        to="/registration"
      >
        Registration
      </NavLink>
      <NavLink className={s.link} activeClassName={s.linkActive} to="/login">
        Login
      </NavLink>
      <NavLink className={s.link} activeClassName={s.linkActive} to="/contacts">
        Contacts
      </NavLink>
    </nav>
  );
}
