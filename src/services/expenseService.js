import axios from 'axios';

const API = axios.create({
  baseURL: 'https://expense-backend-lob3.onrender.com/',
  timeout: 5000
});

export const getExpenses = (params) => API.get('/expenses', { params }).then(res => res.data);
export const createExpense = (payload) => API.post('/expenses', payload).then(res => res.data);
export const updateExpense = (id, payload) => API.put(`/expenses/${id}`, payload).then(res => res.data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`).then(res => res.data);
