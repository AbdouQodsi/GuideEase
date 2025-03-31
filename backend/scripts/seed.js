const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Tour = require('../models/Tour');
const Review = require('../models/Review');

mongoose.connect('mongodb://localhost:27017/Tours', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const randomPassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRating = () => Math.floor(Math.random() * 5) + 1;

async function main() {
  try {
    // Load JSON files
    const usersRaw = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8');
    const toursRaw = fs.readFileSync(path.join(__dirname, 'tours.json'), 'utf-8');

    const users = JSON.parse(usersRaw);
    const tours = JSON.parse(toursRaw);

    // Generate random passwords
    users.forEach(user => {
      user.password = randomPassword();
    });

    // Clean DB
    await User.deleteMany({});
    await Tour.deleteMany({});
    await Review.deleteMany({});

    // Insert users
    const insertedUsers = await User.insertMany(users);
    console.log('✅ Utilisateurs insérés');

    // Insert tours
    const tourGuides = insertedUsers.filter(u => u.userType === 'tourguide');
    const toursToInsert = tours.map((tour, i) => {
      const guide = tourGuides[i % tourGuides.length];
      return {
        ...tour,
        name: `${tour.name} with ${guide.firstname}`,
        userId: guide._id,
        date: `2025-04-${10 + i}`
      };
    });

    const insertedTours = await Tour.insertMany(toursToInsert);
    console.log('✅ Tours insérés');

    // Insert reviews
    const tourists = insertedUsers.filter(u => u.userType === 'tourist');
    const reviews = [];

    const sampleComments = [
      'Amazing tour!', 'Could be better.', 'Loved it!',
      'Too short.', 'Excellent guide.', 'Fantastic!',
      'Great for kids.', 'Nice but crowded.', 'Good value.', 'Would do it again!'
    ];

    const sampleFeedback = [
      'Add more time.', 'Snacks next time.', '', 'Everything was perfect.',
      '', '', 'More history please.', '', 'Better instructions.', ''
    ];

    for (let i = 0; i < 20; i++) {
      const user = getRandom(tourists);
      const tour = getRandom(insertedTours);

      reviews.push({
        userId: user._id,
        tourId: tour._id,
        name: `${user.firstname} ${user.lastname}`,
        rating: getRating(),
        comment: getRandom(sampleComments),
        feedback: getRandom(sampleFeedback),
        createdAt: new Date()
      });
    }

    await Review.insertMany(reviews);
    console.log('✅ Reviews insérées');




    const Booking = require('../models/Booking');
    const generateCardNumber = () =>
    '**** **** **** ' + Math.floor(1000 + Math.random() * 9000).toString();

    const getRandomMonth = () => String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const getRandomYear = () => String(2025 + Math.floor(Math.random() * 5));
    const getRandomCVV = () => String(Math.floor(100 + Math.random() * 900));

    const bookings = [];

    for (let i = 0; i < 20; i++) {
    const user = getRandom(tourists);
    const tour = getRandom(insertedTours);

    const totalPrice = tour.priceAdult + Math.floor(Math.random() * 30); 

    bookings.push({
        userId: user._id,
        tourId: tour._id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        phone: user.phone,
        totalPrice: totalPrice,
        cardNumber: generateCardNumber(),
        expiryMonth: getRandomMonth(),
        expiryYear: getRandomYear(),
        securityNo: getRandomCVV(),
        createdAt: new Date()
    });
    }

await Booking.deleteMany({});
await Booking.insertMany(bookings);
console.log('✅ Bookings insérés');





const Report = require('../models/Report');

const reasons = [
  'Inappropriate content',
  'Fake tour information',
  'Harassment or abuse',
  'Scam or fraud',
  'Other'
];

const statuses = ['in progress', 'processed', 'rejected'];

const reports = [];

for (let i = 0; i < 15; i++) {
  const user = getRandom(tourists);
  const tour = getRandom(insertedTours);

  reports.push({
    userId: user._id.toString(), 
    tourId: tour._id.toString(),
    reason: getRandom(reasons),
    description: `Reported tour: ${tour.name}`,
    createdAt: new Date(),
    status: getRandom(statuses)
  });
}

await Report.deleteMany({});
await Report.insertMany(reports);
console.log('✅ Reports insérés');



    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Erreur :', err);
    mongoose.disconnect();
  }
}

main();
