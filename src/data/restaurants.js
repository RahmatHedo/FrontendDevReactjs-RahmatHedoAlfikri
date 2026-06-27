export const restaurants = [
  {
    id: "1",
    name: "Very Long Name Restaurants Number 1 In List",
    rating: 4.2,
    price: "$$$$",
    isOpen: true,
    categories: ["Thai", "Seafood", "Asian"],
    photos: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r1_1",
        name: "Jessica Davis",
        rating: 5,
        text: "The food here is absolutely phenomenal! The flavors of the traditional pad thai were so rich, and the seafood platter was extremely fresh. Service was exceptionally prompt and friendly.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
      },
      {
        id: "r1_2",
        name: "David Smith",
        rating: 3.5,
        text: "Great atmosphere and lovely design. The food is good but definitely on the pricier side ($$$$). Worth it for special occasions, but not a casual spot.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "2",
    name: "Seafood & Grill Bay",
    rating: 3.8,
    price: "$",
    isOpen: false,
    categories: ["Seafood", "Barbecue", "Grill"],
    photos: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r2_1",
        name: "Marcus Aurelius",
        rating: 4,
        text: "Solid seafood option that won't break the bank ($). The grilled shrimp was seasoned perfectly. Wish they were open longer, they were closed when I tried to go today at late noon.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "3",
    name: "Sushi Sakura",
    rating: 4.5,
    price: "$$",
    isOpen: true,
    categories: ["Japanese", "Sushi", "Asian"],
    photos: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r3_1",
        name: "Yuki Tanaka",
        rating: 5,
        text: "Extremely authentic sushi. The master chef cuts everything right in front of you. Highly recommend the salmon aburi sushi!",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
      },
      {
        id: "r3_2",
        name: "Brian Miller",
        rating: 4,
        text: "Fresh and reasonably priced sushi. The dining room has a peaceful, traditional vibe.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "4",
    name: "La Piazza Trattoria",
    rating: 4.0,
    price: "$$",
    isOpen: true,
    categories: ["Italian", "Pizza", "Pasta"],
    photos: [
      "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r4_1",
        name: "Elena Rostova",
        rating: 4.5,
        text: "Delightful pasta and very warm atmosphere. The woodfired pizzas are incredibly thin and crispy. Felt like dining in Florence!",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "5",
    name: "The Daily Grind Burger",
    rating: 3.5,
    price: "$",
    isOpen: false,
    categories: ["American", "Burgers", "Fast Food"],
    photos: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r5_1",
        name: "Chris Evans",
        rating: 3,
        text: "The burgers are pretty standard. The fries were a bit cold. Fine for a quick bite if you're on a budget ($).",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "6",
    name: "Cantina El Sol",
    rating: 4.8,
    price: "$$$",
    isOpen: true,
    categories: ["Mexican", "Tacos", "Spicy"],
    photos: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r6_1",
        name: "Sofia Vergara",
        rating: 5,
        text: "Hands down the best tacos in the city! The birria is so tender and flavorful, and their home-made salsa is a masterpiece.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
      },
      {
        id: "r6_2",
        name: "Carlos Santana",
        rating: 4.5,
        text: "Great margaritas and lively music. A bit crowded, but the food is worth the short wait.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "7",
    name: "Prime Cut Steakhouse",
    rating: 4.1,
    price: "$$",
    isOpen: true,
    categories: ["Steakhouses", "Steak", "American"],
    photos: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r7_1",
        name: "Gordon Ramsay",
        rating: 4,
        text: "The steak was cooked to a perfect medium-rare. Good seasoning, and the chimichurri sauce was quite bright. A very solid performance.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "8",
    name: "Taco Loco",
    rating: 3.9,
    price: "$$$$",
    isOpen: true,
    categories: ["Mexican", "Fast Food"],
    photos: [
      "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r8_1",
        name: "Leticia Ortiz",
        rating: 4,
        text: "Pricey for Mexican food ($$$$), but the ingredients are premium and organic. The guacamole is freshly mashed to order.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "9",
    name: "Bangkok Street Eat",
    rating: 4.6,
    price: "$$",
    isOpen: true,
    categories: ["Thai", "Street Food", "Asian"],
    photos: [
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r9_1",
        name: "Anna Wong",
        rating: 5,
        text: "Tastes exactly like the night markets in Bangkok! The Tom Yum soup was delightfully sour and spicy. Will definitely return.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "10",
    name: "Luigi's Pizza Palace",
    rating: 3.7,
    price: "$",
    isOpen: false,
    categories: ["Italian", "Pizza", "Fast Food"],
    photos: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600"
    ],
    reviews: [
      {
        id: "r10_1",
        name: "Luigi Mario",
        rating: 4,
        text: "Mama mia! It's a simple pizza, but made with love. Good price, perfect for students.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
      }
    ]
  }
];

export const allCategories = [
  "Thai",
  "Seafood",
  "Japanese",
  "Italian",
  "American",
  "Mexican",
  "Steakhouses"
];
