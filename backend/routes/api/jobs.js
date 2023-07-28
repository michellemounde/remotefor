const express = require('express');
const router = express.Router();

const { scraper } = require('../../utils/scraper');

// Get all jobs
// GET /api/jobs
router.get('/', async (_req, res, next) => {
  // TODO Fetch jobs from database

  // Return for frontend to load
  return res.json({ jobs })
})
