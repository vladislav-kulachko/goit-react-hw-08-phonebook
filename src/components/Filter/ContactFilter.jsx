import s from "./ContactFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addFilterValue } from "../../redux/phonebook/actions";
import { getFilterValue } from "../../redux/phonebook/selectors";

export default function ContactFilter() {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilterValue);
  return (
    <label className={s.label}>
      Find contact by name
      <input
        className={s.input}
        name="find"
        title="Введите имя или название контакта"
        onChange={(e) => dispatch(addFilterValue(e.target.value))}
        value={filterValue}
      />
    </label>
  );
}
