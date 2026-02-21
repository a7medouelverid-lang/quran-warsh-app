// Lottery (Qura'a) logic for random Thumn selection
const express = require('express');
const router = express.Router();

// Configuration
const TOTAL_THUMUN = 480; // عدد الأثمان الكاملة
const HALF_THUMUN = 240; // نصف القرآن
const QUARTER_THUMUN = 120; // ربع القرآن

// Define quarters of Quran in terms of Thumn
const QURAN_SECTIONS = {
  FULL: { min: 1, max: TOTAL_THUMUN, name: 'القرآن الكامل' },
  FIRST_HALF: { min: 1, max: HALF_THUMUN, name: 'النصف الأول' },
  SECOND_HALF: { min: HALF_THUMUN + 1, max: TOTAL_THUMUN, name: 'النصف الثاني' },
  FIRST_QUARTER: { min: 1, max: QUARTER_THUMUN, name: 'الربع الأول' },
  SECOND_QUARTER: { min: QUARTER_THUMUN + 1, max: QUARTER_THUMUN * 2, name: 'الربع الثاني' },
  THIRD_QUARTER: { min: QUARTER_THUMUN * 2 + 1, max: QUARTER_THUMUN * 3, name: 'الربع الثالث' },
  FOURTH_QUARTER: { min: QUARTER_THUMUN * 3 + 1, max: TOTAL_THUMUN, name: 'الربع الرابع' }
};

// Generate random Thumn based on selected section
function getRandomThumn(section) {
  const config = QURAN_SECTIONS[section] || QURAN_SECTIONS.FULL;
  const randomThumn = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
  return {
    thumn: randomThumn,
    section: config.name,
    range: `${config.min} - ${config.max}`
  };
}

// API endpoint for lottery
router.post('/draw', (req, res) => {
  const section = req.body.section || 'FULL'; // Default to full Quran  
  
  if (!QURAN_SECTIONS[section]) {
    return res.status(400).json({ error: 'Invalid section' });
  }
  
  const result = getRandomThumn(section);
  res.json(result);
});

// API endpoint to get all sections
router.get('/sections', (req, res) => {
  const sections = Object.entries(QURAN_SECTIONS).map(([key, value]) => ({
    key,
    name: value.name,
    range: `${value.min} - ${value.max}`
  }));
  res.json(sections);
});

module.exports = router;