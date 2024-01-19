import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/login";
import Product from "./components/products/product";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ element, ...props }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: props.location.pathname }} replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Product />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
