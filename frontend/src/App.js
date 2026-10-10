import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [donors, setDonors] = useState([]);
  const [form, setForm] = useState({ name: '', bloodGroup: '', location: '', contact: '' });

  // Fetch donors when page loads
  useEffect(() => {
    axios.get('http://localhost:5000/api/donors').then(res => setDonors(res.data));
  }, [donors]); // Refreshes automatically when a new donor is added

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/donors', form);
    alert("Donor Successfully Added!");
    setForm({ name: '', bloodGroup: '', location: '', contact: '' }); // clear form
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>🩸BLOOD DONOR FINDER</h1>

      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>Register as a Donor</h3>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{margin: '5px'}}/>
          <input placeholder="Blood Group (e.g., O+)" value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})} required style={{margin: '5px'}}/>
          <input placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required style={{margin: '5px'}}/>
          <input placeholder="Contact Info" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} required style={{margin: '5px'}}/>
          <button type="submit" style={{ padding: '5px 15px', background: 'red', color: 'white', border: 'none' }}>Add</button>
        </form>
      </div>

      <h3>Available Donors</h3>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr><th>Name</th><th>Blood Group</th><th>Location</th><th>Contact</th></tr>
        </thead>
        <tbody>
          {donors.map((d, index) => (
            <tr key={index}>
              <td>{d.name}</td>
              <td><strong>{d.bloodGroup}</strong></td>
              <td>{d.location}</td>
              <td>{d.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;