/* =========================================================================
   Heritage India Backend - Contact Routes (routes/contactRoutes.js)
   API endpoints for handling contact/inquiry form submissions
   ========================================================================= */

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

/* -----------------------------------------------------------------------
   POST /api/contact
   Description : Receives contact form data and saves it to MongoDB
   Access      : Public (called from the frontend contact form)
   ----------------------------------------------------------------------- */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (Name, Email, Message).',
      });
    }

    // Create a new Contact document in MongoDB
    const newContact = await Contact.create({
      name,
      email,
      phone: phone || '',
      interest: interest || 'mix',
      message,
    });

    console.log(`New inquiry saved from: ${newContact.name} (${newContact.email})`);

    // Send success response back to the frontend
    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        createdAt: newContact.createdAt,
      },
    });
  } catch (error) {
    console.error('Error saving contact:', error.message);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.',
    });
  }
});

/* -----------------------------------------------------------------------
   GET /api/contact
   Description : Retrieves all contact submissions (for admin/testing)
   Access      : Public (for development/testing purposes)
   ----------------------------------------------------------------------- */
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.',
    });
  }
});

module.exports = router;
