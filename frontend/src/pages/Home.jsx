// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';

export default function Home({ user, setUser }) {
  const [pins, setPins] = useState([]);

  // Fetch pins when the page loads
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await axios.get('https://pinit-clone.vercel.app/api/pins');
        setPins(res.data);
      } catch (err) {
        console.error("Error fetching pins:", err);
      }
    };
    fetchPins();
  }, []);

  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>For You</h2>
        <button 
          onClick={() => {
            localStorage.removeItem('user');
            setUser(null);
          }} 
          style={{ background: '#efefef', color: 'black', padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Logout
        </button>
      </div>
      
      {/* The Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {pins.map(pin => (
  <div key={pin._id} className="pin-card">
    <img src={pin.imageUrl} alt={pin.title} />
    
    {/* The New Hover Overlay */}
    <div className="pin-overlay">
      <button 
  className="save-btn"
  onClick={async (e) => {
    e.stopPropagation(); 
    try {
      // Call the backend route we just created
      await axios.put(`http://localhost:5000/api/users/${user._id}/save`, {
        pinId: pin._id
      });
      alert("Pin saved to your profile!");
    } catch (err) {
      if(err.response && err.response.status === 403) {
        alert("You already saved this pin!");
      } else {
        console.error(err);
      }
    }
  }}
>
  Save
</button>
      <p className="overlay-title">{pin.title}</p>
    </div>
  </div>
))}
      </Masonry>
    </div>
  );
}