/* =========================================================================
   Heritage India Backend - Contact Model (models/Contact.js)
   Mongoose Schema for storing contact form / tour inquiry submissions
   ========================================================================= */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    // Full name of the person submitting the inquiry
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    // Email address for follow-up communication
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },

    // Optional phone number
    phone: {
      type: String,
      trim: true,
      default: '',
    },

    // Cultural interest category selected from the dropdown
    interest: {
      type: String,
      enum: ['monuments', 'festivals', 'spiritual', 'cuisine', 'mix'],
      default: 'mix',
    },

    // Detailed message describing their ideal journey
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
