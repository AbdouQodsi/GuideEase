const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking successful!', booking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getBookingsByTourOwner = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.aggregate([
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
      
      {
        $unwind: '$tour'
      },
      {
        $match: {
          'tour.userId': userId
        }
      }
    ]);

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings with join:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
