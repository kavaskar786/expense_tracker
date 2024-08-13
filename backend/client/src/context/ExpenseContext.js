import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { expenseReducer } from '../reducers/expenseReducer';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const initialState = {
        expenses: [],
        expense: null,
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(expenseReducer, initialState);

    // Load expenses
    const loadExpenses = async () => {
        try {
            const res = await axios.get('/api/expenses');
            dispatch({ type: 'GET_EXPENSES', payload: res.data });
        } catch (err) {
            dispatch({ type: 'EXPENSE_ERROR', payload: err.response.data.msg });
        }
    };

    // Add expense
    const addExpense = async (expense) => {
        try {
            const res = await axios.post('/api/expenses', expense);
            dispatch({ type: 'ADD_EXPENSE', payload: res.data });
        } catch (err) {
            dispatch({ type: 'EXPENSE_ERROR', payload: err.response.data.msg });
        }
    };

    // Duplicate expense
    const duplicateExpense = async (id) => {
        try {
            const res = await axios.post(`/api/expenses/${id}/duplicate`);
            dispatch({ type: 'ADD_EXPENSE', payload: res.data });
        } catch (err) {
            dispatch({ type: 'EXPENSE_ERROR', payload: err.response.data.msg });
        }
    };

    return (
        <ExpenseContext.Provider
            value={{
                expenses: state.expenses,
                expense: state.expense,
                loading: state.loading,
                error: state.error,
                loadExpenses,
                addExpense,
                duplicateExpense,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseContext;
