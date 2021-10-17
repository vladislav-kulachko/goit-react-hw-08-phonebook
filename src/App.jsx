import s from './App.module.scss';
import ContactForm from './components/Form/ContactForm';
import ContactFilter from './components/Filter/ContactFilter';
import ContactList from './components/List/ContactList';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <section className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm />
      <section className={s.contactsSection}>
        <h2 className={s.titleList}>Contacts list</h2>
        <ContactFilter />
        <ContactList />
      </section>
      <ToastContainer />
    </section>
  );
}
