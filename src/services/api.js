const BASE_URL = 'https://restaurant-api.dicoding.dev';

/**
 * Deterministically enriches a restaurant item from the API with mockup metadata.
 */
export const mapRestaurantItem = (item, searchedCategory = null) => {
  // Deterministic price level based on ID
  const prices = ["$", "$$", "$$$", "$$$$"];
  let sum = 0;
  for (let i = 0; i < item.id.length; i++) {
    sum += item.id.charCodeAt(i);
  }
  const price = prices[sum % prices.length];
  
  // Deterministic open status based on ID
  const isOpen = (sum % 2) === 0;
  
  // Category fallback mapping for list view
  const defaultCuisines = ["Italia", "Modern", "Sop", "Bali", "Sunda", "Jawa"];
  let categoryList = [];
  if (searchedCategory && searchedCategory !== 'all' && searchedCategory.trim() !== '') {
    // Standardize category capitalisation to match filter selection
    const formatted = searchedCategory.charAt(0).toUpperCase() + searchedCategory.slice(1).toLowerCase();
    categoryList = [formatted];
  } else {
    categoryList = [defaultCuisines[sum % defaultCuisines.length]];
  }
  
  // Medium resolution image URL mapping
  const photoUrl = `https://restaurant-api.dicoding.dev/images/medium/${item.pictureId}`;
  
  return {
    ...item,
    price,
    isOpen,
    categories: categoryList,
    photos: [photoUrl]
  };
};

/**
 * Carbon-copy of fetchRestaurants supporting search queries and categories.
 */
export const fetchRestaurants = async ({ category, search } = {}) => {
  try {
    let url = `${BASE_URL}/list`;
    const hasSearch = search && search.trim() !== '';
    const hasCategory = category && category !== 'all' && category.trim() !== '';
    
    if (hasSearch) {
      url = `${BASE_URL}/search?q=${encodeURIComponent(search)}`;
    } else if (hasCategory) {
      url = `${BASE_URL}/search?q=${encodeURIComponent(category)}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API fetch error: ${response.statusText}`);
    }
    
    const data = await response.json();
    const list = (hasSearch || hasCategory) ? (data.restaurants || []) : (data.restaurants || []);
    
    // Map list items to enrich them with category, price, and isOpen
    return list.map(item => mapRestaurantItem(item, hasCategory ? category : null));
  } catch (error) {
    console.error("fetchRestaurants failed:", error);
    throw error;
  }
};

/**
 * Fetches detail of a specific restaurant.
 */
export const fetchRestaurantById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/detail/${id}`);
    if (!response.ok) {
      throw new Error(`API fetch error: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (!data.restaurant) {
      return null;
    }
    
    const apiRes = data.restaurant;
    
    // Enrich with deterministic price & open now flags (consistent with main view)
    const enriched = mapRestaurantItem(apiRes);
    
    // For detail page, parse categories and reviews returned directly by the API
    const realCategories = apiRes.categories ? apiRes.categories.map(c => c.name) : enriched.categories;
    
    // Dicoding API avatar mapping - since no review avatars are returned, we use custom UI profiles
    const mockAvatars = [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    ];
    
    const mappedReviews = apiRes.customerReviews 
      ? apiRes.customerReviews.map((rev, index) => ({
          id: `rev_${index}`,
          name: rev.name,
          rating: 4, // Default review score since Dicoding review payload has no star field
          text: rev.review,
          avatar: mockAvatars[index % mockAvatars.length],
          date: rev.date
        }))
      : [];
      
    return {
      ...enriched,
      categories: realCategories,
      reviews: mappedReviews,
      address: apiRes.address || '123 Culinary St',
      city: apiRes.city
    };
  } catch (error) {
    console.error("fetchRestaurantById failed:", error);
    throw error;
  }
};

/**
 * Adds a new review for a restaurant and returns the updated, enriched review list.
 */
export const addRestaurantReview = async ({ id, name, review }) => {
  try {
    const response = await fetch(`${BASE_URL}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, review }),
    });
    
    if (!response.ok) {
      throw new Error(`API error adding review: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (data.error) {
      throw new Error(data.message || 'Error adding review');
    }
    
    // Map the returned customerReviews to match our frontend review structure
    const mockAvatars = [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    ];
    
    return (data.customerReviews || []).map((rev, index) => ({
      id: `rev_${index}_${Date.now()}`,
      name: rev.name,
      rating: 4, // Default rating since POST /review payload doesn't support rating value
      text: rev.review,
      avatar: mockAvatars[index % mockAvatars.length],
      date: rev.date
    }));
  } catch (error) {
    console.error("addRestaurantReview failed:", error);
    throw error;
  }
};

export const allCategories = [
  "Italia",
  "Modern",
  "Sop",
  "Bali",
  "Sunda",
  "Jawa"
];

