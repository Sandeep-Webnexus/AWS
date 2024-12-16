import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Updated for v6
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import NotFound from './pages/NotFound';
// import Home from './pages/Home/Home';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Product Management</h1>
        <Routes>  {/* Use Routes instead of Switch */}
          {/* <Route path='/' element={<Home/>} /> */}
          <Route path="/" element={<ProductList />} /> 
          <Route path="/create" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
