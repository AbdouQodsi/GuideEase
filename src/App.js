import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import MainPage from "./components/mainpage";
import Footer from "./components/footer";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ListPage from "./components/ListPage";
import TourDetailPage from "./components/TourDetailPage"
import ReviewAndRatingPage from "./components/ReviewAndRatingPage";
import SubmitReviewPage from "./components/SubmitReviewPage";
import PaymentPage from "./components/Payment";
import BookingConfirmationPage from "./components/BookingConfirm";
import TourGuideSignUpPage from "./components/SPsignup"
import Report from "./components/ReportTour";
import TourGuideList from "./components/guideList"
import GuideListDetail from "./components/GuideDetailPage"
import EditTour from "./components/EditTour"
import CreateTour from "./components/createTour";
import ManageReportPage from "./components/AdminManagePage"
import ReportDetailPage from "./components/DetailReport";
import Profile from "./components/profile";
import Dashboard from "./components/Dashboard";
import Booking from "./components/Booking";
import MyReviewsPage from "./components/MyReviewsPage";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about-us" element={<div>About Us Page</div>} />
          <Route path="/popular-destinations" element={<div>Popular Destinations Page</div>} />
          <Route path="/our-tours" element={<div>Our Tours Page</div>} />
          <Route path="/help" element={<div>Help Page</div>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/ListPage" element={<ListPage/>}/>
          <Route path="/ListPage/tour/:id" element={<TourDetailPage/>}/>
          <Route path="/tour/:id/reviews" element={<ReviewAndRatingPage/>}/>
          <Route path='/tour/:id/submit-review' element={<SubmitReviewPage/>}/>
          <Route path="/payment" element={<PaymentPage/>}/>
          <Route path="/BookingConfirm" element={<BookingConfirmationPage/>}/>
          <Route path="/TourGuide-SignUp" element={<TourGuideSignUpPage/>}/>
          <Route path="/ReportTour" element={<Report/>}/>
          <Route path="/GuideList" element={<TourGuideList/>}/>
          <Route path="/tour-services/:id" element={<GuideListDetail />} />
          <Route path="/editTour/:id" element={<EditTour/>}/> 
          <Route path="/createTour" element={<CreateTour/>}/>
          <Route path="/admin/reports" element={<ManageReportPage/>}/>
          <Route path="/reports/:id" element={<ReportDetailPage />} />
          {/* NEW PAGE  */}
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/booking" element={<Booking />}/>
          <Route path="/reviews" element={<MyReviewsPage />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;