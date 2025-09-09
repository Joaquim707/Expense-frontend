import React, { useState, useEffect } from "react";

const initial = { title: "", amount: "", category: "", date: "", notes: "" };

export default function ExpenseForm({ onSubmit, onCancel, defaultValues }) {
  const [form, setForm] = useState(initial);

  useEffect(() => {
    if (defaultValues) {
      setForm({
        ...defaultValues,
        amount: defaultValues.amount ?? "",
        date: defaultValues.date
          ? new Date(defaultValues.date).toISOString().slice(0, 10)
          : "",
      });
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: Number(form.amount),
      date: form.date || new Date(),
    };
    onSubmit(payload);
    setForm(initial);
  };

  const inputStyle = {
    width: "92%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    marginRight: "10px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1b1b1b",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        marginBottom: "20px",
      }}
    >
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        type="number"
        min="0"
        required
        style={inputStyle}
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        style={inputStyle}
      />
      <div style={{ marginTop: "10px" }}>
        <button
          type="submit"
          style={{ ...buttonStyle, backgroundColor: "#4CAF50", color: "#fff" }}
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              ...buttonStyle,
              backgroundColor: "#f44336",
              color: "#fff",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
