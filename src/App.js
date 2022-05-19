import './App.css';

import Login from "./pages/Login"
import Product from "./pages/Product"
import User from "./pages/User"


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router >
  );
}

export default App;
