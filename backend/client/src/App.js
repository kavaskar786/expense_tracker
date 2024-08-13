import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { CategoryProvider } from './context/CategoryContext';
import { TagProvider } from './context/TagContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ExpenseList from './components/Expenses/ExpenseList';
import ExpenseForm from './components/Expenses/ExpenseForm';
import ExpenseCharts from './components/Charts/ExpenseCharts';
import CategoryList from './components/Categories/CategoryList';
import TagList from './components/Tags/TagList';

const App = () => {
    return (
        <AuthProvider>
            <ExpenseProvider>
                <CategoryProvider>
                    <TagProvider>
                        <Router>
                            <div className="App">
                                <Routes>
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/expenses" component={ExpenseList} />
                                    <Route exact path="/expenses/new" component={ExpenseForm} />
                                    <Route exact path="/charts" component={ExpenseCharts} />
                                    <Route exact path="/categories" component={CategoryList} />
                                    <Route exact path="/tags" component={TagList} />
                                </Routes>
                            </div>
                        </Router>
                    </TagProvider>
                </CategoryProvider>
            </ExpenseProvider>
        </AuthProvider>
    );
};

export default App;
