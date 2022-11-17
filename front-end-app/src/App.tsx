import './App.css';
import { BookCatalog }from './components/BookCatalog';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ReadersDiretory } from './components/ReadersDirectory';
import { BorrowsManager } from './components/BorrowsManager';

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                <BookCatalog/>
            }>
            </Route>
            <Route
              path='/readers'
              element={
                <ReadersDiretory/>
            }>
            </Route>
            <Route
              path='/borrows'
              element={
                <BorrowsManager/>
              }>
            </Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
