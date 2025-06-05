import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Todos from './pages/Todos';
import Players from './pages/Players';
import Training from './pages/Training';
import Statistics from './pages/Statistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="todos" element={<Todos />} />
          <Route path="players" element={<Players />} />
          <Route path="training" element={<Training />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;