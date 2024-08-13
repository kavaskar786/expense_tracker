import React, { useState, useContext } from 'react';
import ExpenseContext from '../../context/ExpenseContext';

const ExpenseForm = () => {
    const expenseContext = useContext(ExpenseContext);
    const { addExpense } = expenseContext;

    const [expense, setExpense] = useState({
        summary: '',
        description: '',
        date: new Date().toISOString().slice(0, 10),
        category: '',
        tags: '',
    });

    const onChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        addExpense(expense);
        setExpense({
            summary: '',
            description: '',
            date: new Date().toISOString().slice(0, 10),
            category: '',
            tags: '',
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Add Expense</h2>
            <input
                type="text"
                name="summary"
                value={expense.summary}
                onChange={onChange}
                placeholder="Summary"
                required
            />
            <input
                type="text"
                name="description"
                value={expense.description}
                onChange={onChange}
                placeholder="Description"
                required
            />
            <input
                type="date"
                name="date"
                value={expense.date}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="category"
                value={expense.category}
                onChange={onChange}
                placeholder="Category"
                required
            />
            <input
                type="text"
                name="tags"
                value={expense.tags}
                onChange={onChange}
                placeholder="Tags (comma separated)"
            />
            <input type="submit" value="Add Expense" />
        </form>
    );
};

export default ExpenseForm;
