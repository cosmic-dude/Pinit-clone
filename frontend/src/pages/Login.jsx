// src/pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 1. IMPORT LINK HERE

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('https://pinit-clone.vercel.app/auth/login', {
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data); 
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome Back to PinIt</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', gap: '15px' }}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required style={{ padding: '10px' }}/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required style={{ padding: '10px' }}/>
        <button type="submit" style={{ background: '#e60023', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '20px', fontWeight: 'bold' }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Wrong email or password!</p>}
      
      {/* 2. ADD THE SIGN UP LINK HERE */}
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#e60023', textDecoration: 'none', fontWeight: 'bold' }}>
          Sign up
        </Link>
      </p>
    </div>
  );
}