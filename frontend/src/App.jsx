import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import { Link } from 'react-router-dom';
import CreatePin from './pages/CreatePin';
import Home from './pages/Home'; // Make sure this is imported!

const Navbar = () => (
  <nav style={{ 
    position: 'sticky', 
    top: 0, 
    zIndex: 100, 
    padding: '15px 20px', 
    background: 'white', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
  }}>
    <Link to="/" style={{ textDecoration: 'none', color: '#e60023', fontWeight: '900', fontSize: '24px' }}>
      PinIt
    </Link>
    
    <input 
      type="text" 
      placeholder="Search for pins..." 
      style={{ flex: 0.8, padding: '12px 20px', borderRadius: '24px', border: 'none', background: '#e9e9e9', outline: 'none', fontSize: '16px' }}
    />

    <Link to="/create" style={{ background: '#efefef', color: 'black', padding: '10px 20px', borderRadius: '24px', textDecoration: 'none', fontWeight: 'bold' }}>
      Create
    </Link>
  </nav>
);

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/create" element={user ? <CreatePin /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;