import { restaurants } from '../data/restaurants';

/**
 * Simulates a server-side API call to query restaurants by category/cuisine.
 * Returns a Promise that resolves with the filtered restaurants after a realistic network delay.
 * 
 * @param {Object} params
 * @param {string} [params.category] - Server-side category search filter.
 * @returns {Promise<Array>} List of restaurants matching the category.
 */
export const fetchRestaurants = ({ category } = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...restaurants];
      
      // Server-side category filter
      if (category && category !== "all" && category.trim() !== "") {
        const lowerCategory = category.toLowerCase();
        result = result.filter(r => 
          r.categories.some(c => c.toLowerCase() === lowerCategory)
        );
      }
      
      resolve(result);
    }, 600); // 600ms simulated network delay
  });
};

/**
 * Simulates fetching a single restaurant by its ID.
 * 
 * @param {string} id - Restaurant ID.
 * @returns {Promise<Object|null>} The restaurant object or null if not found.
 */
export const fetchRestaurantById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const restaurant = restaurants.find(r => r.id === id);
      resolve(restaurant || null);
    }, 300); // 300ms simulated network delay
  });
};
