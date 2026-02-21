// API routes for Quran data
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Configuration for Quran sections
const QURAN_CONFIG = {
  TOTAL_AHZAB: 60,
  AHZAB_PER_THUMN: 8,
  TOTAL_THUMUN: 480,
  TOTAL_PAGES: 604,
  PAGES_PER_HIZB: 10
};

// Endpoints for fetching Quran data
router.get('/surah/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://api.alquran.cloud/v1/surah/${req.params.id}/ar.warsh`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Surah data' });
  }
});

router.get('/ayah/:number', async (req, res) => {
  try {
    const response = await axios.get(`https://api.alquran.cloud/v1/ayah/${req.params.number}/ar.warsh`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Ayah data' });
  }
});

router.get('/config', (req, res) => {
  res.json(QURAN_CONFIG);
});

module.exports = router;