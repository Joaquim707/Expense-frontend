import axios from "axios";

// Use environment variable for flexibility
const API = axios.create({
  baseURL: "https://expense-backend-production-3190.up.railway.app/api" || "http://localhost:5000/api",
  timeout: 10000, // allow for Render cold starts
});

// Interceptor for logging / handling errors
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getExpenses = (params) => API.get("/expenses", { params });
export const createExpense = (payload) => API.post("/expenses", payload);
export const updateExpense = (id, payload) => API.put(`/expenses/${id}`, payload);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
