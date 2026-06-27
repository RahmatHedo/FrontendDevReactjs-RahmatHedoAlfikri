import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRestaurantById, addRestaurantReview } from '../services/api';
import { ArrowLeft, RefreshCw, MapPin, Plus, Minus, Star, Send } from 'lucide-react';

const DetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Review Form States
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');
  const [reviewErrorMsg, setReviewErrorMsg] = useState('');

  useEffect(() => {
    const loadRestaurant = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRestaurantById(id);
        setRestaurant(data);
      } catch (error) {
        console.error("Failed to load restaurant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurant();
  }, [id]);

  // Star rating helper
  const renderStars = (score) => {
    const stars = [];
    const roundedScore = Math.round(score);
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedScore) {
        stars.push(<span key={i} className="text-slate-800 text-xl">★</span>);
      } else {
        stars.push(<span key={i} className="text-slate-300 text-xl">☆</span>);
      }
    }
    return stars;
  };

  const renderReviewStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= score) {
        stars.push(<Star key={i} className="h-4 w-4 fill-slate-800 text-slate-800" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-slate-200" />);
      }
    }
    return stars;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) {
      setReviewErrorMsg("Please fill in both your name and review text.");
      return;
    }

    setIsSubmittingReview(true);
    setReviewErrorMsg('');
    setReviewSuccessMsg('');

    try {
      const updatedReviews = await addRestaurantReview({
        id,
        name: newReviewName,
        review: newReviewText
      });

      setRestaurant(prev => ({
        ...prev,
        reviews: updatedReviews
      }));

      setReviewSuccessMsg("Review posted successfully! Thank you.");
      setNewReviewName('');
      setNewReviewText('');
      setNewReviewRating(5);

      // Hide success message after 4s
      setTimeout(() => {
        setReviewSuccessMsg('');
      }, 4000);
    } catch (err) {
      console.error("Failed to post review:", err);
      setReviewErrorMsg("Failed to add review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <RefreshCw className="h-8 w-8 text-navy-dark animate-spin" />
        <p className="text-neutral-light text-sm font-light">Loading restaurant details...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 max-w-4xl py-20 text-center">
        <h2 className="text-2xl font-semibold text-neutral-dark mb-4">Restaurant Not Found</h2>
        <p className="text-neutral-light mb-8">The restaurant you are looking for does not exist or has been removed.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-navy-hover transition-colors rounded-xs"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Restaurants
        </Link>
      </div>
    );
  }

  const { name, rating, price, isOpen, categories, photos, reviews, address, city } = restaurant;

  return (
    <div className="container mx-auto px-4 max-w-5xl pb-20 pt-6">
      {/* Back Link */}
      <div className="text-left mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-light hover:text-neutral-dark transition-colors font-medium group"
        >
          <ArrowLeft className="h-4 w-4 transform transition-transform group-hover:-translate-x-1" />
          <span>Back to Restaurants</span>
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image, Info, Reviews */}
        <div className="lg:col-span-2 text-left">
          
          {/* Banner Photo */}
          <div className="aspect-[21/9] w-full bg-slate-100 rounded-sm overflow-hidden mb-6 shadow-sm">
            <img
              src={photos[0]}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Restaurant Title & Core Info */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border-light pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-dark mb-2 leading-tight">
                {name}
              </h1>
              
              {/* Category, Price and Status tags */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-medium tracking-wider text-neutral-light uppercase">
                <span className="bg-slate-100 text-neutral-dark px-3 py-1 rounded-full">
                  {categories.join(', ')}
                </span>
                <span className="bg-slate-100 text-neutral-dark px-3 py-1 rounded-full">
                  Price: {price}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                  isOpen 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                    : 'bg-rose-50 border-rose-200 text-rose-700'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                  {isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>

            {/* Rating Stars and Score badge */}
            <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-1 shrink-0 self-start md:self-auto bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-sm w-full md:w-auto">
              <div className="flex items-center gap-0.5">
                {renderStars(rating)}
              </div>
              <span className="text-xl font-bold text-neutral-dark md:mt-1">{rating.toFixed(1)} / 5.0</span>
              <span className="text-[11px] text-neutral-light font-medium uppercase tracking-wider">
                ({reviews.length} Customer Reviews)
              </span>
            </div>
          </div>

          {/* Additional detail description */}
          <div className="py-6">
            <h2 className="text-lg font-semibold text-neutral-dark mb-3">About {name}</h2>
            <p className="text-neutral-light font-light leading-relaxed">
              Welcome to {name}, where we specialize in serving premium quality {categories.join(' & ')} dishes. 
              Our kitchen carefully sources every single ingredient to provide a highly authentic and memorable dining experience. 
              Whether you are here for a business lunch, a casual get-together with family, or a romantic dinner date, 
              our warm hospitality and masterfully curated menu will leave a lasting impression.
            </p>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 border-t border-border-light pt-8">
            <h2 className="text-xl font-semibold text-neutral-dark mb-6">Customer Reviews</h2>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-border-light rounded-sm p-5 shadow-xs flex flex-col md:flex-row gap-4 items-start hover:shadow-sm transition-shadow">
                  {/* Reviewer Avatar */}
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-100 shrink-0 shadow-inner"
                  />
                  
                  {/* Reviewer Details & Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                      <h4 className="font-semibold text-neutral-dark text-sm">{review.name}</h4>
                      <div className="flex items-center gap-0.5">
                        {renderReviewStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-neutral-light text-sm font-light leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Write a Review Section */}
            <div className="mt-12 bg-white border border-border-light rounded-sm p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-dark mb-2">Share Your Experience</h3>
              <p className="text-xs text-neutral-light font-light mb-6">Your feedback helps others make better dining decisions. Submit a live review to this restaurant.</p>
              
              <form onSubmit={handleReviewSubmit} className="space-y-5">
                {/* Alert Messages */}
                {reviewSuccessMsg && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-sm font-light">
                    {reviewSuccessMsg}
                  </div>
                )}
                {reviewErrorMsg && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-sm px-4 py-3 rounded-sm font-light">
                    {reviewErrorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Reviewer Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-dark uppercase tracking-wider block">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      disabled={isSubmittingReview}
                      className="w-full px-3 py-2 bg-slate-50 border border-border-light rounded-xs text-sm text-neutral-dark focus:outline-none focus:ring-1 focus:ring-navy-dark focus:bg-white transition-colors"
                      required
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-dark uppercase tracking-wider block">Rating (Your Score)</label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          disabled={isSubmittingReview}
                          className="text-2xl focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                        >
                          {star <= newReviewRating ? (
                            <span className="text-amber-500">★</span>
                          ) : (
                            <span className="text-slate-300">☆</span>
                          )}
                        </button>
                      ))}
                      <span className="text-sm font-medium text-neutral-light ml-2">{newReviewRating} out of 5</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-dark uppercase tracking-wider block">Review Message</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about the food, service, and dining ambiance..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    disabled={isSubmittingReview}
                    className="w-full px-3 py-2 bg-slate-50 border border-border-light rounded-xs text-sm text-neutral-dark focus:outline-none focus:ring-1 focus:ring-navy-dark focus:bg-white transition-colors"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-navy-dark hover:bg-navy-hover disabled:bg-slate-300 text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs cursor-pointer"
                  >
                    {isSubmittingReview ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" /> Post Review
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Right Column: Map Block & Side Details */}
        <div className="text-left space-y-6">
          
          {/* Map Location Section */}
          <div className="bg-white border border-border-light rounded-sm p-4 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-dark mb-3 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-rose-500" />
              <span>Location Map</span>
            </h3>
            
            {/* Elegant SVG/HTML Mock Map */}
            <div className="relative aspect-square w-full rounded-sm bg-sky-50 border border-slate-100 overflow-hidden shadow-inner flex items-center justify-center">
              {/* Fake Map Grid lines */}
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: 'radial-gradient(circle, #0f2c59 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />
              
              {/* Fake roads and parks */}
              <div className="absolute top-1/3 left-0 w-full h-8 bg-amber-100 rotate-6 transform" />
              <div className="absolute top-0 left-1/4 w-10 h-full bg-amber-100 -rotate-12 transform" />
              <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-emerald-100 opacity-60 filter blur-xs" />
              <div className="absolute bottom-12 right-6 w-32 h-20 bg-emerald-100 opacity-60 filter blur-xs" />
              
              {/* Simulated Map Marker */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <MapPin className="h-10 w-10 text-rose-500 fill-rose-500/30 filter drop-shadow-md" />
                <span className="absolute -top-1.5 bg-neutral-dark text-white text-[9px] px-1.5 py-0.5 rounded-xs font-semibold whitespace-nowrap shadow-sm">
                  {name}
                </span>
              </div>

              {/* Map controls */}
              <div className="absolute bottom-3 right-3 flex flex-col gap-1 z-20">
                <button className="h-8 w-8 bg-white border border-slate-200 text-slate-800 rounded-sm flex items-center justify-center shadow-md hover:bg-slate-50 active:scale-95 transition-transform cursor-pointer">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 bg-white border border-slate-200 text-slate-800 rounded-sm flex items-center justify-center shadow-md hover:bg-slate-50 active:scale-95 transition-transform cursor-pointer">
                  <Minus className="h-4 w-4" />
                </button>
              </div>

              {/* Tiny scale marker */}
              <div className="absolute bottom-3 left-3 bg-white/80 border border-slate-200 px-1.5 py-0.5 rounded-xs text-[9px] font-semibold text-slate-700">
                50m
              </div>
            </div>

            <div className="mt-3 text-xs text-neutral-light">
              <p className="font-medium text-neutral-dark mb-1">Address:</p>
              <p className="font-light">{address}, {city}</p>
              <p className="font-light mt-1">Latitude: -6.2146 | Longitude: 106.8451</p>
            </div>
          </div>

          {/* Quick Details Sidebar */}
          <div className="bg-white border border-border-light rounded-sm p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-dark border-b border-slate-50 pb-2">
              Restaurant Details
            </h3>

            {/* Timings */}
            <div className="text-xs">
              <span className="font-semibold text-neutral-dark block mb-1">Hours:</span>
              <span className="text-neutral-light font-light block">Monday - Friday: 11:00 AM - 10:00 PM</span>
              <span className="text-neutral-light font-light block">Saturday - Sunday: 10:00 AM - 11:00 PM</span>
            </div>

            {/* Contacts */}
            <div className="text-xs">
              <span className="font-semibold text-neutral-dark block mb-1">Phone:</span>
              <span className="text-neutral-light font-light block">+62 21-555-0199</span>
            </div>

            {/* Reservation */}
            <div className="pt-2">
              <button className="w-full py-2.5 bg-white border border-neutral-dark text-neutral-dark hover:bg-neutral-dark hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors rounded-xs cursor-pointer text-center">
                Book a Table
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DetailPage;
