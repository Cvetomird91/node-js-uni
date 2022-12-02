import './App.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import BooksPage from './components/BooksPage';
import BookPage from './components/BookPage';
import { store } from './state';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <header className='sticky'>
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Books
        </NavLink>
        <NavLink to="/readers/" className="button rounded">
          Readers
        </NavLink>
        <NavLink to="/borrows/" className="button rounded">
          Borrows
        </NavLink>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
