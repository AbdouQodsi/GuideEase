const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createTour, deleteTour, getAllTours, updateTour, getTourById, getToursByUser } = require('../controllers/tourController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/tours');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), createTour);
router.get('/', getAllTours);
router.put('/:id', upload.single('image'), updateTour); 
router.delete('/:id', deleteTour);
router.get('/user/:userId', getToursByUser);
router.get('/:id', getTourById);

module.exports = router;