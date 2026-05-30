// src/pages/CreatePin.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      // Send the new pin data to the backend
      await axios.post('https://pinit-clone.vercel.app/api/pins', {
        title,
        description,
        imageUrl
      });
      // If successful, immediately redirect the user back to the Home feed
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Create a New Pin</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '400px', margin: '0 auto', gap: '15px' }}>
        
        <input 
          type="text" 
          placeholder="Add your title" 
          onChange={e => setTitle(e.target.value)} 
          required 
          style={{ padding: '15px', fontSize: '18px', border: 'none', borderBottom: '2px solid #ccc', outline: 'none' }}
        />
        
        <input 
          type="text" 
          placeholder="Tell everyone what your Pin is about" 
          onChange={e => setDescription(e.target.value)} 
          required 
          style={{ padding: '10px', fontSize: '14px', border: 'none', borderBottom: '2px solid #ccc', outline: 'none' }}
        />
        
        <input 
          type="url" 
          placeholder="Paste high-quality image URL here" 
          onChange={e => setImageUrl(e.target.value)} 
          required 
          style={{ padding: '10px', fontSize: '14px', border: 'none', borderBottom: '2px solid #ccc', outline: 'none' }}
        />

        {/* Image Preview (Only shows if they pasted a URL) */}
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Preview" 
            style={{ width: '100%', borderRadius: '16px', marginTop: '10px', maxHeight: '400px', objectFit: 'cover' }} 
          />
        )}

        <button type="submit" style={{ background: '#e60023', color: 'white', padding: '15px', border: 'none', cursor: 'pointer', borderRadius: '24px', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
          Save Pin
        </button>

      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Something went wrong. Please try again.</p>}
    </div>
  );
}