import React from "react";
import ExpenseList from "./components/ExpenseList";

export default function App() {
  return (
    <div
      style={{
        margin: "0 20px", // left and right margin
      }}
    >
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Expense Tracker
      </h1>
      <ExpenseList />
    </div>
  );
}
