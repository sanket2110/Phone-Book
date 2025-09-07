import React, { useState } from "react";
import axios from "axios";

function PhonebookForm({ addContact }) {
  const [formData, setFormData] = useState({ name: "", number: "", city: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/phone", formData);
      alert("Contact saved successfully!");
      addContact(res.data);
      setFormData({ name: "", number: "", city: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save contact.");
    }
  };

  return (
    <form className="pb-form pb-card" onSubmit={handleSubmit}>
      <h2 className="pb-form-title">Add New Contact</h2>

      <label className="pb-field">
        <span></span>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="pb-field">
        <span></span>
        <input
          type="text"
          name="number"
          placeholder="Enter phone number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </label>

      <label className="pb-field">
        <span></span>
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="pb-btn pb-btn-primary">
        Save Contact
      </button>
    </form>
  );
}

export default PhonebookForm;
