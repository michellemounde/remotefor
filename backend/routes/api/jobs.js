const express = require('express');

const router = express.Router();

// const { scraper } = require('../../utils/scrapers/scraper');

// Get all jobs
// GET /api/jobs
router.get('/', async (_req, res, next) => {
// TODO Fetch jobs from database
  // Return for frontend to load
  const jobs = {};
  res.json({ jobs });
});
