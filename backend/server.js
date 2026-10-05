/* =========================================================================
   Heritage India Backend - Main Server (server.js)
   Node.js + Express server that:
     1. Connects to MongoDB
     2. Serves the frontend static files (HTML, CSS, JS, images)
     3. Provides REST API for contact form submissions
   ========================================================================= */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const connectDB = require('./config/db');

// Import Routes
const contactRoutes = require('./routes/contactRoutes');

// Initialize Express App
const app = express();

const frontendPath = path.join(__dirname, '../frontend');

// ─── LIVE RELOAD IN DEVELOPMENT ─────────────────────────────────────────────
// Automatically watches all frontend files (HTML, CSS, JS, images) and refreshes
// browser tabs in real-time whenever code changes are saved.
if (process.env.NODE_ENV !== 'production') {
  const liveReloadServer = livereload.createServer({
    exts: ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'svg', 'webp', 'json'],
    delay: 100
  });

  liveReloadServer.watch(frontendPath);

  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });

  // Must be registered BEFORE serving static files
  app.use(connectLivereload());
}

// ─── MIDDLEWARE ──────────────────────────────────────────────────────────────

// Enable CORS (allows frontend to communicate with backend)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// ─── SERVE FRONTEND STATIC FILES ────────────────────────────────────────────
// This serves your HTML, CSS, JS, and image files from the parent directory
// so you can access the website at http://localhost:5000
app.use(express.static(frontendPath));

// ─── API ROUTES ─────────────────────────────────────────────────────────────

// API info endpoint - shows available routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Heritage India API',
    version: '1.0.0',
    endpoints: {
      contact: {
        POST: '/api/contact - Submit contact form',
        GET: '/api/contact - Get all contact submissions'
      }
    }
  });
});

// Contact form API endpoint
app.use('/api/contact', contactRoutes);

// ─── ROOT ROUTE (Fallback to index.html) ────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ─── START SERVER ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

// Attempt database connection and start Express server
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║               Heritage India Live Server                     ║');
    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log(`║   Website URL : http://localhost:${PORT}                        ║`);
    console.log(`║   API URL     : http://localhost:${PORT}/api                    ║`);
    console.log('║   Live Reload : Active (auto-updates HTML/CSS/JS changes)    ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log('');
  });
})();

