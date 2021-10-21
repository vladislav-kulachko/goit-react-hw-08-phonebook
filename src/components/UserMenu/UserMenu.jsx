import {useDispatch, useSelector} from 'react-redux';
import {getUserName, getError} from '../../redux/auth/auth-selectors';
import {logoutUser} from '../../redux/auth/auth-operations';
import {toast, Flip, Bounce} from 'react-toastify';
import s from './UserMenu.module.scss';

export default function UserMenu() {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();
  const handlerLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success(`Succsess! Logout user with name: ""`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 3000,
        transition: Bounce,
        toastId: 10,
      });
    } catch {
      toast.error(`Logout user failed with error: ""`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 11,
      });
    }
  };
  return (
    <div className={s.userBar}>
      <span className={s.greetings}>
        Welcome, <span className={s.name}>{userName}!</span>
      </span>
      <div>
        <img className={s.avatar} src="" alt=""></img>
      </div>
      <button className={s.button} type="button" onClick={handlerLogout}>
        Logout
      </button>
    </div>
  );
}
