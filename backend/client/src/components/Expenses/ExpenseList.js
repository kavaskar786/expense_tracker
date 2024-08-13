import React, { useContext, useEffect } from 'react';
import ExpenseContext from '../../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
    const expenseContext = useContext(ExpenseContext);
    const { expenses, loadExpenses } = expenseContext;

    useEffect(() => {
        loadExpenses();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h2>Expenses</h2>
            {expenses.map((expense) => (
                <ExpenseItem key={expense._id} expense={expense} />
            ))}
        </div>
    );
};

export default ExpenseList;
