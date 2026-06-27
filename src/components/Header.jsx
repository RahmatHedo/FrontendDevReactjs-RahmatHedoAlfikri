import React from 'react';

const Header = () => {
  return (
    <header className="py-8 md:py-12 border-b border-border-light text-left">
      <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-dark mb-4">
        Restaurants
      </h1>
      <p className="text-neutral-light max-w-3xl text-base md:text-lg leading-relaxed font-light">
        Discover the finest culinary experiences near you. Filter by opening hours, price range, 
        and select from local or international cuisines to find your next perfect meal.
      </p>
    </header>
  );
};

export default Header;
