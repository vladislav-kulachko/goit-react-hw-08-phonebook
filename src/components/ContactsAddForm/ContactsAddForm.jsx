import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import s from "./ContactsAddForm.module.scss";
import {addContact} from "../../redux/contacts/contacts-operations";
import {getAllContacts} from "../../redux/contacts/contacts-selectors";
import {toast, Flip, Bounce} from "react-toastify";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  const addOneContact = async (name, number) => {
    const result = await dispatch(addContact({name, number}));
    if (addContact.fulfilled.match(result)) {
      toast.success(
        `Succsess! Added contact with name: "${result.payload.name}"`,
        {
          theme: "colored",
          position: "top-center",
          autoClose: 3000,
          transition: Bounce,
        },
      );
    } else {
      toast.error(`Adding contact failed with error: "${result.payload}"`, {
        theme: "colored",
        position: "top-center",
        autoClose: 5000,
        transition: Flip,
        toastId: 5,
      });
    }
  };

  const handlerContactAdd = e => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      default:
        throw new Error();
    }
  };
  const handlerSubmitFormClick = e => {
    e.preventDefault();
    if (name !== "" && number !== "") {
      if (contacts.find(contact => contact.number === number)) {
        alert(`This number ${number} is already on the list`);
        return;
      } else if (contacts.find(contact => contact.name === name)) {
        alert(`This name ${name} is already on the list`);
        return;
      } else {
        addOneContact(name, number);
        setName("");
        setNumber("");
      }
    }
  };

  return (
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
          onChange={handlerContactAdd}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={handlerContactAdd}
        />
      </label>
      <button className={s.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}
