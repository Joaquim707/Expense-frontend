import React from "react";

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 8,
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <div>
          <strong>{expense.title}</strong> — ₹{expense.amount}
        </div>
        <div style={{ fontSize: 12 }}>
          {expense.category} • {new Date(expense.date).toLocaleDateString()}
        </div>
        {expense.notes && <div style={{ fontSize: 12 }}>{expense.notes}</div>}
      </div>
      <div>
        <button onClick={() => onEdit(expense)}>Edit</button>
        <button onClick={() => onDelete(expense._id)}>Delete</button>
      </div>
    </div>
  );
}
