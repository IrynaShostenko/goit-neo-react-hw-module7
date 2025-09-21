import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const normalizePhone = (value) => {
    let v = value.replace(/\s+/g, '').trim(); 
    if (/^0\d{9}$/.test(v)) v = '+38' + v;
    if (!v.startsWith('+')) v = '+38' + v;
    return v;
  };

  const validate = (n, num) => {
    if (!n.trim()) return 'Name is required';
    if (n.trim().length < 2) return 'Name must be at least 2 letters';
    if (!/^[a-zA-Zа-яА-ЯіїєІЇЄ\s]+$/.test(n.trim()))
      return 'Name can only contain letters and spaces';
    if (!num.trim()) return 'Number is required';
    if (!/^\+38\d{10}$/.test(num)) return 'Phone must be like +38 067 0000000';
    return '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const normalized = normalizePhone(number);
    const err = validate(name, normalized);
    if (err) return setError(err);

    dispatch(addContact({ name: name.trim(), number: normalized }));
    setName('');
    setNumber('');
    setError('');
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Melissa Smith"

        />
      </label>

      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="067 0000000"
        />
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
