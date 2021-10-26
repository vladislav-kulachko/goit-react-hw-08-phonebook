import ContactForm from '../../components/ContactsAddForm/ContactsAddForm';
import ContactFilter from '../../components/ContactsFilter/ContactsFilter';
import ContactList from '../../components/ContactsList/ContactsList';
import {getUserFetching} from '../../redux/auth/auth-selectors';
import s from './ContactsViewPage.module.scss';
import {useSelector} from 'react-redux';

export default function ContactsViews() {
  const fetchingUser = useSelector(getUserFetching);

  return (
    !fetchingUser && (
      <section className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <div className={s.containFormList}>
          <ContactForm />
          <section className={s.contactsSection}>
            <h2 className={s.titleList}>Contacts list</h2>
            <ContactFilter />
            <ContactList />
          </section>
        </div>
      </section>
    )
  );
}
