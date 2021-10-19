import {NavLink} from 'react-router-dom';
import s from './Navigation.module.scss';
import UserMenu from '../UserMenu/UserMenu';
import {useSelector} from 'react-redux';
import {getIsLoggedIn} from '../../redux/auth/auth-selectors';

export default function Navigation() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <nav className={s.navigation}>
      {isLoggedIn ? (
        <div className={s.userNavContainer}>
          <NavLink
            className={s.link}
            activeClassName={s.linkActive}
            to="/contacts"
          >
            Contacts
          </NavLink>
          <UserMenu />
        </div>
      ) : (
        <div>
          <NavLink
            className={s.link}
            activeClassName={s.linkActive}
            to="/registration"
          >
            Registration
          </NavLink>
          <NavLink
            className={s.link}
            activeClassName={s.linkActive}
            to="/login"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
}
