import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import s from './LoginPage.module.scss';
import {loginUser} from '../../redux/auth/auth-operations';
import {getError} from '../../redux/auth/auth-selectors';
import {toast, Flip, Bounce} from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const error = useSelector(getError);

  const dispatch = useDispatch();

  const dispatchUser = async (email, password) => {
    try {
      const loggedInUser = await dispatch(
        loginUser({email, password}),
      ).unwrap();
      toast.success(
        `Succsess! Logged in user with name: "${loggedInUser.user.name}"`,
        {
          theme: 'colored',
          position: 'top-center',
          autoClose: 3000,
          transition: Bounce,
          toastId: 7,
        },
      );
    } catch {
      toast.error(`Login failed: ""`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 8,
      });
    }
  };

  const handlerUserLogin = e => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value.trim());
        break;
      case 'password':
        setPassword(e.target.value.trim());
        break;
      default:
        throw new Error();
    }
  };
  const handlerSubmitFormClick = e => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      dispatchUser(email, password);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <section className={s.container}>
      <form className={s.form} onSubmit={handlerSubmitFormClick}>
        <label className={s.label}>
          Email
          <input
            className={s.input}
            type="email"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Введите действительный электронный адрес в формате 'имя_пользователя@имя_домена' !"
            required
            value={email}
            onChange={handlerUserLogin}
          />
        </label>
        <label className={s.label}>
          Password
          <input
            className={s.input}
            type="password"
            name="password"
            pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
            title="Поле пароля должно содержать минимум 8 символов, одна цифра, одна буква в верхнем регистре и одна в нижнем"
            required
            value={password}
            onChange={handlerUserLogin}
          />
        </label>
        <button className={s.button} type="submit">
          Login
        </button>
      </form>
    </section>
  );
}
