const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/bloodbank');

// Define what a Donor looks like
const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  location: String,
  contact: String
});
const Donor = mongoose.model('Donor', donorSchema);

// API to Add a Donor (Create)
app.post('/api/donors', async (req, res) => {
  const donor = new Donor(req.body);
  await donor.save();
  res.status(201).send(donor);
});

// API to View all Donors (Read)
app.get('/api/donors', async (req, res) => {
  const donors = await Donor.find();
  res.send(donors);
});

app.listen(5000, () => console.log('Backend Server running on port 5000'));