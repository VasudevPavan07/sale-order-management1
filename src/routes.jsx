import React from 'react';
 import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
 import LoginPage from '../src/pages/LoginPage'
 import SaleOrdersPage from '../src/pages/SaleOrdersPage'

const AppRoutes = () => {
    const isAuthenticated =() => {
        return localStorage.getItem('authenticated') === 'true';
    };
  return (
    <Router>
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path="/sale-orders"  element={isAuthenticated() ? <SaleOrdersPage /> : <Navigate to="/login" />}  />
            <Route path='*' element={<Navigate to={isAuthenticated() ? "/sale-orders":"/login"}/>}/>
        </Routes>
    </Router>
  );
};

export default AppRoutes;
