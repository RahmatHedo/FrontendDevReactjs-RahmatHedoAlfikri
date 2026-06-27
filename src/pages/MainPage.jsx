import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import RestaurantCard from '../components/RestaurantCard';
import { fetchRestaurants } from '../services/api';
import { allCategories } from '../data/restaurants';
import { RefreshCw, ChefHat } from 'lucide-react';

const MainPage = () => {
  // Filter States
  const [openNow, setOpenNow] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [category, setCategory] = useState('all');

  // Restaurant Data States
  const [rawRestaurants, setRawRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(8);

  // Fetch restaurants from "server" when category changes
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRestaurants({ category });
        setRawRestaurants(data);
      } catch (error) {
        console.error("Failed to load restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, [category]);

  // Apply client-side filters (open now, price range)
  useEffect(() => {
    let result = [...rawRestaurants];

    // Client-side: open now filter
    if (openNow) {
      result = result.filter(r => r.isOpen);
    }

    // Client-side: price range filter
    if (priceRange !== 'all') {
      result = result.filter(r => r.price === priceRange);
    }

    setFilteredRestaurants(result);
    // Reset page pagination when filter changes
    setVisibleCount(8);
  }, [rawRestaurants, openNow, priceRange]);

  const handleClearAll = () => {
    setOpenNow(false);
    setPriceRange('all');
    setCategory('all');
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl pb-16">
      {/* Header section */}
      <Header />

      {/* Filter controls */}
      <FilterBar
        openNow={openNow}
        setOpenNow={setOpenNow}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        category={category}
        setCategory={setCategory}
        categories={allCategories}
        onClearAll={handleClearAll}
        isLoading={isLoading}
      />

      {/* Restaurant List Section */}
      <main className="mt-8">
        <h2 className="text-2xl font-light text-neutral-dark text-left mb-6">
          All Restaurants
        </h2>

        {/* Loading Indicator for server-side filter */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCw className="h-8 w-8 text-navy-dark animate-spin" />
            <p className="text-neutral-light text-sm font-light">Querying kitchen database...</p>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-200 rounded-sm bg-white p-8">
            <ChefHat className="h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-neutral-dark mb-1">No Restaurants Found</h3>
            <p className="text-neutral-light text-sm max-w-md font-light">
              We couldn't find any restaurants matching your active filters. Try adjusting your search parameters or clearing filters.
            </p>
            <button
              onClick={handleClearAll}
              className="mt-4 px-4 py-2 bg-navy-dark text-white text-xs font-semibold uppercase tracking-wider hover:bg-navy-hover transition-colors rounded-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Restaurant Grid */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRestaurants.slice(0, visibleCount).map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredRestaurants.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="px-10 py-3.5 border border-neutral-dark text-neutral-dark hover:bg-neutral-dark hover:text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 rounded-xs cursor-pointer bg-white"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MainPage;
