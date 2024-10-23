import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { routes } from './routes';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.page />}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;