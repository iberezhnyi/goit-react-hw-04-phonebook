import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ createUser }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    createUser({ name, number });

    setName('');
    setNumber('');
  };

  return (
    <form className={css['contact-form']} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          className={css['contact-form-input']}
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          required
        />
      </label>

      <label>
        Number
        <input
          className={css['contact-form-input']}
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          required
        />
      </label>

      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
  // }
};

export default ContactForm;

ContactForm.propTypes = {
  createUser: PropTypes.func.isRequired,
};
