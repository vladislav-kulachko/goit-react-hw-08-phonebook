import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import s from './RegistrationPage.module.scss';
import {addUser} from '../../redux/auth/auth-operations';
import {getError} from '../../redux/auth/auth-selectors';
import {toast, Flip, Bounce} from 'react-toastify';

export default function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const error = useSelector(getError);

  const dispatch = useDispatch();

  const addOneUser = async (name, email, password) => {
    try {
      const addedUser = await dispatch(
        addUser({name, email, password}),
      ).unwrap();
      toast.success(`Succsess! Added user with name: "${addedUser.name}"`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 3000,
        transition: Bounce,
        toastId: 5,
      });
    } catch {
      toast.error(`Adding user failed with error: ""`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 6,
      });
    }
  };

  const handlerUserAdd = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value.trim());
        break;
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
    if (name !== '' && email !== '' && password !== '') {
      addOneUser(name, email, password);
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <section className={s.container}>
      <form className={s.form} onSubmit={handlerSubmitFormClick}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={handlerUserAdd}
          />
        </label>
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
            onChange={handlerUserAdd}
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
            onChange={handlerUserAdd}
          />
        </label>
        <button className={s.button} type="submit">
          Register
        </button>
      </form>
    </section>
  );
}
