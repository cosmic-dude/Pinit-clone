// src/pages/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // 1. IMPORT LINK HERE

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('https://pinit-clone.vercel.app/auth/register', {
        username,
        email,
        password,
      });
      if (res.data) {
        navigate('/login');
      }
    } catch (err) {
      console.log("THE REAL ERROR IS:", err.response.data); // ADD THIS LINE
      setError(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Create a PinIt Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', gap: '15px' }}>
        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} required style={{ padding: '10px' }}/>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required style={{ padding: '10px' }}/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required style={{ padding: '10px' }}/>
        <button type="submit" style={{ background: '#e60023', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '20px', fontWeight: 'bold' }}>
          Register
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Something went wrong! Username or email might be taken.</p>}
      
      {/* 2. ADD THE LOGIN LINK HERE */}
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#e60023', textDecoration: 'none', fontWeight: 'bold' }}>
          Log in
        </Link>
      </p>
    </div>
  );
}