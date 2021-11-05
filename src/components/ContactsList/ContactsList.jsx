import {useEffect, useState} from 'react';
import s from './ContactsList.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {toast, Flip, Bounce} from 'react-toastify';
import {
  delContact,
  getContacts,
} from '../../redux/contacts/contacts-operations';
import {
  getFilteredContacts,
  isLoading,
} from '../../redux/contacts/contacts-selectors';
import Spinner from '../Loader/Loader';

export default function ContactList() {
  const [reload, setReload] = useState(true);
  const filteredContacts = useSelector(getFilteredContacts);
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();

  const delOneContact = async e => {
    const result = await dispatch(delContact(e.target.id));
    if (delContact.fulfilled.match(result)) {
      toast.success(
        `Succsess! Deleted contact with name: "${e.target.dataset.name}"`,
        {
          theme: 'colored',
          position: 'top-center',
          autoClose: 3000,
          transition: Bounce,
        },
      );
    } else {
      toast.error(`Failed delete with error: "${result.payload}"`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
        transition: Flip,
        toastId: 1,
      });
    }
  };

  useEffect(() => {
    if (reload) {
      (async () => {
        const result = await dispatch(getContacts());
        setReload(false);
        if (getContacts.fulfilled.match(result)) {
          toast.success(`Succsess! Downloaded all contacts!`, {
            theme: 'colored',
            position: 'top-center',
            autoClose: 3000,
            transition: Bounce,
            toastId: 2,
          });
        } else {
          setReload(false);
          toast.error(
            `Failed download contacts with error: ${result.payload}`,
            {
              theme: 'colored',
              position: 'top-center',
              autoClose: 5000,
              transition: Flip,
              toastId: 3,
            },
          );
        }
      })();
    }
  }, [dispatch, reload]);

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
                data-name={name}
                id={id}
                type='button'
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
