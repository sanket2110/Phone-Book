import { useState, useEffect } from "react";
import axios from "axios";
import PhonebookForm from "./PostUser";
import Table from "./Table";

function Phonebook() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/phone");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const addContact = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const updateContact = (updatedContact, originalNumber) => {
    setContacts((prev) =>
      prev.map((c) => (c.number === originalNumber ? updatedContact : c))
    );
  };

  const deleteContact = (number) => {
    setContacts((prev) => prev.filter((c) => c.number !== number));
  };

  return (
    <div className="pb-page">
      <PhonebookForm addContact={addContact} />
      <Table
        contacts={contacts}
        updateContact={updateContact}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default Phonebook;
