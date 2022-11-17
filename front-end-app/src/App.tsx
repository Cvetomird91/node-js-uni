import './App.css';
import { BookCatalog }from './components/BookCatalog';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
              path='/readers'>

            </Route>
            <Route
              path='/borrows'>

            </Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
