import {useEffect, useState} from 'react';
import s from './ContactList.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {toast, Flip, Bounce} from 'react-toastify';
import {delContact, getContacts} from '../../redux/phonebook/operations';
import {
  getFilteredContacts,
  getError,
  isLoading,
} from '../../redux/phonebook/selectors';
import Spinner from '../Loader/Loader';

export default function ContactList() {
  const [reload, setReload] = useState(true);
  const filteredContacts = useSelector(getFilteredContacts);
  const loading = useSelector(isLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  const delOneContact = async e => {
    try {
      const deletedContact = await dispatch(delContact(e.target.id)).unwrap();
      toast.success(`Succsess! Deleted contact with id: "${deletedContact}"`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 3000,
        transition: Bounce,
      });
    } catch (err) {
      toast.error(`Failed delete with error: "${err}"`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 1,
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (reload) {
        try {
          await dispatch(getContacts()).unwrap();
          setReload(false);
          toast.success(`Succsess! Downloaded all contacts!`, {
            theme: 'colored',
            position: 'top-center',
            autoClose: 3000,
            transition: Bounce,
            toastId: 2,
          });
        } catch (err) {
          setReload(false);
          toast.error(`Failed download contacts with error: ${err}`, {
            theme: 'colored',
            position: 'top-center',
            autoClose: 5000,
            transition: Flip,
            toastId: 3,
          });
        }
      }
    })();
  }, [dispatch, error, reload]);

  return (
    <>
      <ul className={s.list}>
        <Spinner loading={loading} />

        {filteredContacts.length === 0 ? (
          <li className={s.notify}>
            Oops, this is empty... Please add your contacts!
          </li>
        ) : (
          filteredContacts.map(({id, name, number}) => (
            <li className={s.item} key={id}>
              {name}:<span className={s.phone}>{number}</span>
              <button
                className={s.button}
                id={id}
                type="button"
                onClick={delOneContact}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
