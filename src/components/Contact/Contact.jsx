import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import styles from './Contact.module.css';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <li className={styles.item}>
      <span className={styles.name}>{contact.name}</span>
      <span className={styles.number}>{contact.number}</span>
      <button
        className={styles.delete}
        onClick={() => dispatch(deleteContact(contact.id))}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
