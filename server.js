const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Route to create a new referral
app.post('/api/referrals', async (req, res) => {
  const { referrerName, referrerEmail, name, email, message } = req.body;

  try {
    // Save referral data
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        name,
        email,
        message,
      },
    });
    res.status(201).json(referral); // Respond with the created referral
  } catch (error) {
    console.error('Error creating referral:', error.message); // Log the error
    res.status(500).json({ error: 'Internal server error' }); // Respond with a 500 error
  }
});

// Route to get all referrals
app.get('/api/referrals', async (req, res) => {
  try {
    // Retrieve all referrals using Prisma Client
    const referrals = await prisma.referral.findMany();
    res.status(200).json(referrals); // Respond with the list of referrals
  } catch (error) {
    console.error('Error retrieving referrals:', error.message); // Log the error
    res.status(500).json({ error: 'Internal server error' }); // Respond with a 500 error
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
