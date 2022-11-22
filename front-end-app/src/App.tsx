import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import BooksPage from './components/BooksPage';


function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
