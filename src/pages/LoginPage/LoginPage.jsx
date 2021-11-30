import {useDispatch} from "react-redux";
import {useState} from "react";
import s from "./LoginPage.module.scss";
import {loginUser} from "../../redux/auth/auth-operations";
import {toast, Flip, Bounce} from "react-toastify";
import {useSelector} from "react-redux";
import {getUserFetching} from "../../redux/auth/auth-selectors";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchingUser = useSelector(getUserFetching);
  const dispatch = useDispatch();

  const dispatchUser = async (email, password) => {
    const result = await dispatch(loginUser({email, password}));
    if (loginUser.fulfilled.match(result)) {
      toast.success(`You logged in succsess, ${result.payload.user.name}`, {
        theme: "colored",
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
        toastId: 7,
      });
    } else {
      toast.error(`Login failed: "${result.payload}"`, {
        theme: "colored",
        position: "top-center",
        autoClose: 5000,
        transition: Flip,
        toastId: 8,
      });
    }
  };

  const handlerUserLogin = e => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value.trim());
        break;
      case "password":
        setPassword(e.target.value.trim());
        break;
      default:
        throw new Error();
    }
  };
  const handlerSubmitFormClick = e => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatchUser(email, password);
      setEmail("");
      setPassword("");
    }
  };

  return (
    !fetchingUser && (
      <section className={s.container}>
        <form className={s.form} onSubmit={handlerSubmitFormClick}>
          <label className={s.label}>
            Email
            <input
              className={s.input}
              type="email"
              name="email"
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
              title="Введите пароль"
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
    )
  );
}
