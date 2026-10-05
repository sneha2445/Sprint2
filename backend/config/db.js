/* =========================================================================
   Heritage India Backend - Database Connection (config/db.js)
   Connects to MongoDB using Mongoose
   ========================================================================= */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/heritageIndia');

    console.log('===========================================');
    console.log(`  MongoDB Connected: ${conn.connection.host}`);
    console.log(`  Database Name   : ${conn.connection.name}`);
    console.log('===========================================');
    return true;
  } catch (error) {
    console.warn(`[DB Status] MongoDB not connected (${error.message}).`);
    console.warn('Frontend pages and live-reload will continue running normally.');
    return false;
  }
};

module.exports = connectDB;

