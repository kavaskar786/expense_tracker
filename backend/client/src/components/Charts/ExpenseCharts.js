import React, { useContext, useEffect } from 'react';
import ExpenseContext from '../../context/ExpenseContext';
import { Pie } from 'react-chartjs-2';

const ExpenseCharts = () => {
    const expenseContext = useContext(ExpenseContext);
    const { expenses, loadExpenses } = expenseContext;

    useEffect(() => {
        loadExpenses();
        // eslint-disable-next-line
    }, []);

    const categoryData = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + 1;
        return acc;
    }, {});

    const tagData = expenses.reduce((acc, expense) => {
        const tags = expense.tags.split(',');
        tags.forEach((tag) => {
            acc[tag.trim()] = (acc[tag.trim()] || 0) + 1;
        });
        return acc;
    }, {});

    return (
        <div>
            <h2>Expense Distribution</h2>
            <Pie
                data={{
                    labels: Object.keys(categoryData),
                    datasets: [
                        {
                            data: Object.values(categoryData),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                    ],
                }}
                height={100}
            />
            <Pie
                data={{
                    labels: Object.keys(tagData),
                    datasets: [
                        {
                            data: Object.values(tagData),
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        },
                    ],
                }}
                height={100}
            />
        </div>
    );
};

export default ExpenseCharts;
