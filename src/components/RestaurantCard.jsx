import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const { id, name, rating, price, isOpen, categories, photos } = restaurant;

  // Use first photo, fallback to placeholder if none exists
  const imageUrl = photos && photos.length > 0
    ? photos[0]
    : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600";

  // Use first category
  const primaryCategory = categories && categories.length > 0
    ? categories[0]
    : "Restaurant";

  // Render unicode star ratings to match the mockup style
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

  return (
    <div className="bg-white border border-border-light rounded-sm overflow-hidden flex flex-col justify-between hover-scale shadow-sm hover:shadow-md">
      <div>
        {/* Restaurant Image */}
        <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Info Area */}
        <div className="p-4 text-left">
          {/* Restaurant Name */}
          <h3 className="text-lg font-semibold text-neutral-dark leading-snug line-clamp-2 min-h-[3.5rem] mb-1">
            {name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5 mb-3">
            {renderStars(rating)}
          </div>

          {/* Category, Price, Status Row */}
          <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-neutral-light uppercase border-t border-slate-50 pt-3 mt-1">
            <span>
              {primaryCategory} • {price}
            </span>

            <div className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
              <span className={isOpen ? 'text-neutral-dark' : 'text-neutral-light'}>
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 pt-0">
        <Link
          to={`/restaurant/${id}`}
          className="block w-full py-2.5 text-center bg-navy-dark hover:bg-navy-hover text-white text-xs font-semibold tracking-widest uppercase transition-colors rounded-xs cursor-pointer"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
