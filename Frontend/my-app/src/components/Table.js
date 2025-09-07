import { useState } from "react";
import axios from "axios";

function Table({ contacts, updateContact, deleteContact }) {
  const [originalNumber, setOriginalNumber] = useState(null);
  const [editContact, setEditContact] = useState(null);

  const handleDelete = async (number) => {
    try {
      await axios.delete(`http://localhost:8080/phone/${number}`);
      alert("Contact deleted successfully");
      deleteContact(number);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEditClick = (contact) => {
    setEditContact(contact);
    setOriginalNumber(contact.number);
  };

  const handleChange = (e) => {
    setEditContact({ ...editContact, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/phone/${originalNumber}`, editContact)
      .then((res) => {
        updateContact(res.data, originalNumber);
        setEditContact(null);
        setOriginalNumber(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="pb-container">
      <div className="pb-header">
        <h2 className="pb-title">PhoneBook</h2>
        <p className="pb-subtitle"></p>
      </div>

      <div className="pb-table-wrapper">
        <table className="pb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>City</th>
              <th className="pb-col-actions">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.number}>
                <td data-label="Name">{contact.name}</td>
                <td data-label="Number">{contact.number}</td>
                <td data-label="City">{contact.city}</td>
                <td className="pb-actions">
                  <button
                    className="pb-btn pb-btn-danger"
                    onClick={() =>
                      window.confirm("Are you sure you want to delete?")
                        ? handleDelete(contact.number)
                        : null
                    }
                    aria-label={`Delete ${contact.name}`}
                  >
                    Delete
                  </button>
                  <button
                    className="pb-btn pb-btn-outline"
                    onClick={() => handleEditClick(contact)}
                    aria-label={`Edit ${contact.name}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="4" className="pb-empty">
                  No contacts yet. Add one above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editContact && (
        <div className="pb-drawer-backdrop" role="dialog" aria-modal="true">
          <aside className="pb-drawer">
            <header className="pb-drawer-header">
              <h3>Edit Contact</h3>
              <button
                className="pb-icon-btn"
                onClick={() => setEditContact(null)}
                aria-label="Close edit panel"
                title="Close"
              >
                ✕
              </button>
            </header>

            <form className="pb-form" onSubmit={handleUpdate}>
              <label className="pb-field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={editContact.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </label>

              <label className="pb-field">
                <span>Number</span>
                <input
                  type="text"
                  name="number"
                  value={editContact.number}
                  onChange={handleChange}
                  placeholder="Number"
                  required
                />
              </label>

              <label className="pb-field">
                <span>City</span>
                <input
                  type="text"
                  name="city"
                  value={editContact.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </label>

              <div className="pb-form-actions">
                <button type="submit" className="pb-btn pb-btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="pb-btn"
                  onClick={() => setEditContact(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Table;
