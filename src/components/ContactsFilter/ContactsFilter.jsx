import s from './ContactsFilter.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {addFilterValue} from '../../redux/contacts/contacts-reducers';
import {getFilterValue} from '../../redux/contacts/contacts-selectors';

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
        onChange={e => dispatch(addFilterValue(e.target.value))}
        value={filterValue}
      />
    </label>
  );
}
