import {useDispatch, useSelector} from "react-redux";
import {getUserName} from "../../redux/auth/auth-selectors";
import {logoutUser} from "../../redux/auth/auth-operations";
import {toast, Flip, Bounce} from "react-toastify";
import s from "./UserMenu.module.scss";
import avatar from "../../img/user.png";

export default function UserMenu() {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();
  const handlerLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success(`Logout success!`, {
        theme: "colored",
        position: "top-center",
        autoClose: 3000,
        transition: Bounce,
        toastId: 10,
      });
    } catch (err) {
      toast.error(`Logout failed with error: "${err}"`, {
        theme: "colored",
        position: "top-center",
        autoClose: 5000,
        transition: Flip,
        toastId: 11,
      });
    }
  };
  return (
    <div className={s.userBar}>
      <div className={s.avatar}>
        <img src={avatar} alt="avatar_user"></img>
      </div>
      <span className={s.greetings}>
        Welcome, <span className={s.name}>{userName}!</span>
      </span>
      <button className={s.button} type="button" onClick={handlerLogout}>
        Logout
      </button>
    </div>
  );
}
