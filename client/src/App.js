import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routeComponents/Home';  // Example page component
import Register from './routeComponents/Register';
import { AuthProvider } from './context/authContext';
import Login from './routeComponents/Login';
import CreateProduct from './routeComponents/CreateProduct';
import Dashboard from './routeComponents/Dashboard';
import TrackProduct from './routeComponents/TrackProduct';
import TransferProduct from './routeComponents/TransferProduct';
import Elements from './routeComponents/Elements';
import QualityCheck from './routeComponents/QualityCheck';

function App() {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
   
    <Router> {/* Your Navbar can remain outside of the Routes for global access */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/createProduct" element={<CreateProduct/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/trackProduct" element={<TrackProduct/>}/>
        <Route path="/transferProduct" element={<TransferProduct/>}/>
        <Route path="/products" element={<Elements/>}/>
        <Route path="/qualityCheck" element={<QualityCheck/>}/>
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> Catch-all route for 404 */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
