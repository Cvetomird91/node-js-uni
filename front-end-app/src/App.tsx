import './App.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import BooksPage from './components/books/BooksPage';
import BookPage from './components/books/BookPage';
import ReadersPage from './components/readers/ReadersPage';
import { store } from './state';
import BorrowsPage from './components/borrows/BorrowsPage';

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
            <Route path="/readers" element={<ReadersPage/>} />
            <Route path="/borrows" element={<BorrowsPage/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
