import React, { useState } from 'react';
import axios from 'axios';

function AddExpense() {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission to create expense
    };

    return (
        <div>
            <h1>Add Expense</h1>
            <form onSubmit={handleSubmit}>
                {/* Form fields for expense attributes */}
            </form>
        </div>
    );
}

export default AddExpense;
