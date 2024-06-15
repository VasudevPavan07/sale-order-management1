import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/pages/LoginPage';
import SaleOrdersPage from '../src/pages/SaleOrdersPage';

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');

  useEffect(() => {
    // Check authentication status when the component mounts
    const authStatus = localStorage.getItem('authenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/sale-orders"
          element={isAuthenticated ? <SaleOrdersPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
