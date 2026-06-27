import React from 'react';
import { ChevronDown, RefreshCw, Search } from 'lucide-react';

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  openNow,
  setOpenNow,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  categories = [],
  onClearAll,
  isLoading
}) => {
  const prices = [
    { label: 'All Prices', value: 'all' },
    { label: '$', value: '$' },
    { label: '$$', value: '$$' },
    { label: '$$$', value: '$$$' },
    { label: '$$$$', value: '$$$$' }
  ];

  const hasActiveFilters = openNow || priceRange !== 'all' || category !== 'all' || (searchQuery && searchQuery.trim() !== '');

  return (
    <div className="py-5 border-b border-border-light flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Filters Group */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-light">
        <span className="font-normal text-neutral-dark whitespace-nowrap">Filter By:</span>

        {/* Search Input */}
        <div className="relative flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-56 pl-9 pr-3 py-1.5 bg-white border border-border-light rounded-full text-neutral-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-dark text-sm transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Open Now Checkbox/Radio */}
        <label className="flex items-center gap-2 cursor-pointer py-1 px-3 rounded-full hover:bg-slate-100 transition-colors border border-border-light">
          <input
            type="checkbox"
            checked={openNow}
            onChange={(e) => setOpenNow(e.target.checked)}
            className="w-4.5 h-4.5 rounded-full border-slate-300 text-navy-dark focus:ring-navy-dark accent-navy-dark cursor-pointer"
          />
          <span className="text-neutral-dark font-medium select-none">Open Now</span>
        </label>

        {/* Price Dropdown */}
        <div className="relative">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="appearance-none bg-white border border-border-light rounded-full pl-3 pr-8 py-1.5 font-medium text-neutral-dark focus:outline-none focus:ring-2 focus:ring-navy-dark cursor-pointer transition-colors hover:bg-slate-50"
          >
            {prices.map((p) => (
              <option key={p.value} value={p.value}>
                {p.value === 'all' ? 'Price' : `Price: ${p.label}`}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="h-4 w-4 text-neutral-light" />
          </div>
        </div>

        {/* Categories Dropdown */}
        <div className="relative flex items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none bg-white border border-border-light rounded-full pl-3 pr-8 py-1.5 font-medium text-neutral-dark focus:outline-none focus:ring-2 focus:ring-navy-dark cursor-pointer transition-colors hover:bg-slate-50"
          >
            <option value="all">Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading ? (
              <RefreshCw className="h-3.5 w-3.5 text-navy-dark animate-spin" />
            ) : (
              <ChevronDown className="h-4 w-4 text-neutral-light" />
            )}
          </div>
        </div>
      </div>

      {/* Clear All Button */}
      <button
        onClick={onClearAll}
        disabled={!hasActiveFilters}
        className={`px-6 py-2 border rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
          hasActiveFilters
            ? 'border-neutral-dark text-neutral-dark hover:bg-neutral-dark hover:text-white cursor-pointer'
            : 'border-slate-200 text-slate-300 cursor-not-allowed'
        }`}
      >
        Clear All
      </button>
    </div>
  );
};

export default FilterBar;
