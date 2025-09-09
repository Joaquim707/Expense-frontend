import React, { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // items per page
  const [totalPages, setTotalPages] = useState(1);

  const fetchExpenses = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await getExpenses({ page: pageNumber, limit, sort: "-date" });
      setExpenses(res.data);
      setTotalPages(Math.ceil(res.meta.total / limit));
      setPage(res.meta.page);
    } catch (err) {
      console.error(err);
      alert("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(page);
  }, []);

  const handleAdd = async (payload) => {
    try {
      await createExpense(payload);
      fetchExpenses(page);
    } catch (err) {
      console.error(err);
      alert("Failed to add");
    }
  };

  const handleUpdate = async (payload) => {
    try {
      await updateExpense(editing._id, payload);
      setEditing(null);
      fetchExpenses(page);
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      fetchExpenses(page);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchExpenses(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="w-full max-w-3xl p-6">
        {/* Expense Form */}
        <ExpenseForm
          onSubmit={editing ? handleUpdate : handleAdd}
          defaultValues={editing}
          onCancel={() => setEditing(null)}
        />
      </div>
      <div className="w-full max-w-3xl p-6">
        {/* Expense List */}
        <div className="mt-6 space-y-4">
          {expenses.map((exp) => (
            <ExpenseItem
              key={exp._id}
              expense={exp}
              onEdit={(e) => setEditing(e)}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        <div
          className="flex justify-center items-center gap-4 mt-6"
          style={{
            marginTop: "15px",
          }}
        >
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
