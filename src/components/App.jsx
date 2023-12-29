import { useEffect, useState } from 'react';
import ContactForm from './Forms/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createUser = data => {
    const newUser = {
      ...data,
      id: nanoid(),
    };

    const isDuplicated = contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isDuplicated) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    setContacts(prev => [...prev, newUser]);
  };

  const deleteUser = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  const searchUser = ({ target: { value } }) => {
    setFilter(value);
  };

  const getFilteredUsers = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm createUser={createUser} />
      <h2>Contacts</h2>
      <Filter value={filter} searchUser={searchUser} />
      <ContactsList user={filteredUsers} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
