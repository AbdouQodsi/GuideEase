const Tour = require('../models/Tour');

exports.createTour = async (req, res) => {
  const {
    name,
    description,
    date,
    map,
    numberOfPeople,
    duration,
    language,
    meetingPoint,
    included,
    activity,
    priceAdult,
    priceChild,
    category,
    userId,
    mapEmbed
  } = req.body;

  const image = req.file ? req.file.path.replace(/\\\\/g, '/').replace(/\\/g, '/') : null;

  try {
    const newTour = new Tour({
      name,
      image,
      description,
      date,
      map,
      numberOfPeople,
      duration,
      language,
      meetingPoint,
      included,
      activity,
      priceAdult,
      priceChild,
      category,
      userId,
      mapEmbed,
    });

    await newTour.save();
    res.status(201).json({ message: "Tour created successfully", tour: newTour });
  } catch (err) {
    console.error("Tour creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (err) {
    console.error('Delete tour error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllTours = async (req, res) => {
    try {
      const tours = await Tour.find();
      res.status(200).json(tours);
    } catch (err) {
      console.error('Get all tours error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


exports.getToursByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tours = await Tour.find({ userId });
    res.status(200).json(tours);
  } catch (err) {
    console.error('Get user tours error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.updateTour = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    date,
    map,
    numberOfPeople,
    duration,
    language,
    meetingPoint,
    included,
    activity,
    priceAdult,
    priceChild,
    category,
    mapEmbed
  } = req.body;


const image = req.file ? req.file.path.replace(/\\\\/g, '/').replace(/\\/g, '/') : null;

  try {
    const tour = await Tour.findById(id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });

    tour.name = name;
    tour.description = description;
    tour.date = date;
    tour.map = map;
    tour.numberOfPeople = numberOfPeople;
    tour.duration = duration;
    tour.language = language;
    tour.meetingPoint = meetingPoint;
    tour.included = included;
    tour.activity = activity;
    tour.priceAdult = priceAdult;
    tour.priceChild = priceChild;
    tour.category  = category;
    tour.mapEmbed  = mapEmbed;
    if (image) {
      tour.image = image;
    }

    const updatedTour = await tour.save();
    res.status(200).json({ message: 'Tour updated successfully', tour: updatedTour });
  } catch (err) {
    console.error('Update tour error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getTourById = async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
      if (!tour) return res.status(404).json({ message: 'Tour not found' });
      res.status(200).json(tour);
    } catch (err) {
      console.error('Get tour error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  