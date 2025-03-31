const Review = require('../models/Review');

// Add a review
exports.createReview = async (req, res) => {
  const { tourId, userId, name, rating, comment, feedback } = req.body;

  if (!tourId || !userId || !rating) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const review = new Review({ tourId, userId, name, rating, comment, feedback });
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (err) {
    console.error('Review creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get reviews for a tour
exports.getReviewsByTour = async (req, res) => {
  try {
    const reviews = await Review.find({ tourId: req.params.tourId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (err) {
      console.error("Fetching all reviews error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };



exports.getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.aggregate([
      {
       $addFields: {
          tourIdObj: { $toObjectId: "$tourId" }
        }
      },
      {
        $lookup: {
          from: 'tours',
          localField: 'tourIdObj', 
          foreignField: '_id',
          as: 'tour'
        }
      },
      { $unwind: '$tour' },
      { $match: { 'tour.userId': userId } }
    ]);

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get reviews by tour owner error:", error);
    res.status(500).json({ error: "Failed to get reviews." });
  }
};



exports.addFeedbackToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { feedback } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { feedback },
      { new: true }
    );

    if (!review) return res.status(404).json({ error: "Review not found." });

    res.json({ message: "Feedback added.", review });
  } catch (error) {
    console.error("Add feedback error:", error);
    res.status(500).json({ error: "Failed to add feedback." });
  }
};
