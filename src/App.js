import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Product from "./components/products/product";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
    

          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/dashboard' element={<Product/>}/>
          </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
