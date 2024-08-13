import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

function Home() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState({});
    const [tags, setTags] = useState({});

    useEffect(() => {
        // Fetch data for charts and recent expenses
    }, []);

    return (
        <div>
            <h1>Expense Dashboard</h1>
            {/* Charts and recent expenses */}
        </div>
    );
}

export default Home;
