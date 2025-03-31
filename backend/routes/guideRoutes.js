const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerOrUpdateGuide } = require('../controllers/guideController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/licenses');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/register-or-update', upload.single('license'), registerOrUpdateGuide);

module.exports = router;