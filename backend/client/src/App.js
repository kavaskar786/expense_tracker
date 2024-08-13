import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddExpense from './components/AddExpense';
import Categories from './components/Categories';
import Tags from './components/Tags';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact component={Home} />
                <Route path="/add-expense" component={AddExpense} />
                <Route path="/categories" component={Categories} />
                <Route path="/tags" component={Tags} />
            </Routes>
        </Router>
    );
}

export default App;
