export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "breakfast" | "meals" | "beverages";
  image: string;
  featured?: boolean;
  vegetarian: boolean;
  spicy?: boolean;
}

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: "1",
    name: "Masala Dosa",
    description:
      "Crispy golden crepe made from fermented rice and lentil batter, filled with spiced potato masala. Served with coconut chutney and sambar.",
    price: 89,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1668236543090-82eb5eada67a?w=600&h=400&fit=crop",
    featured: true,
    vegetarian: true,
    spicy: true,
  },
  {
    id: "2",
    name: "Idli Sambar",
    description:
      "Soft, fluffy steamed rice cakes served with aromatic lentil sambar and a trio of chutneys. A wholesome South Indian classic.",
    price: 69,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=400&fit=crop",
    featured: true,
    vegetarian: true,
  },
  {
    id: "3",
    name: "Medu Vada",
    description:
      "Crispy on the outside, soft on the inside — these savory lentil doughnuts are deep-fried to golden perfection and served with chutney.",
    price: 59,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "4",
    name: "Pongal",
    description:
      "Comforting rice and lentil porridge tempered with black pepper, cumin, and ghee. A beloved South Indian breakfast staple.",
    price: 79,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "5",
    name: "Rava Dosa",
    description:
      "Thin, lacy crepe made from semolina batter with hints of cumin and pepper. Delightfully crispy with every bite.",
    price: 99,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "6",
    name: "Upma",
    description:
      "Savory semolina dish cooked with mustard seeds, curry leaves, and fresh vegetables. Light yet satisfying.",
    price: 59,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop",
    vegetarian: true,
  },

  // Meals
  {
    id: "7",
    name: "South Indian Thali",
    description:
      "A grand platter featuring rice, sambar, rasam, kootu, poriyal, appalam, pickle, curd, and payasam. The complete South Indian experience.",
    price: 199,
    category: "meals",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    featured: true,
    vegetarian: true,
  },
  {
    id: "8",
    name: "Chettinad Chicken Curry",
    description:
      "Fiery and aromatic chicken curry made with freshly ground Chettinad spices — star anise, fennel, and black stone flower.",
    price: 249,
    category: "meals",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop",
    featured: true,
    vegetarian: false,
    spicy: true,
  },
  {
    id: "9",
    name: "Sambar Rice",
    description:
      "Steamed rice generously topped with richly spiced lentil and vegetable sambar. Soul-warming comfort food.",
    price: 129,
    category: "meals",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "10",
    name: "Rasam Rice",
    description:
      "Tangy and peppery tamarind-tomato broth served over steamed rice. Known for its soothing, restorative qualities.",
    price: 119,
    category: "meals",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&h=400&fit=crop",
    vegetarian: true,
    spicy: true,
  },
  {
    id: "11",
    name: "Lemon Rice",
    description:
      "Fragrant rice tossed with tangy lemon juice, turmeric, mustard seeds, and crunchy peanuts. Bright and flavorful.",
    price: 109,
    category: "meals",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "12",
    name: "Biryani",
    description:
      "Fragrant basmati rice layered with tender meat, caramelized onions, and aromatic spices. Slow-cooked to perfection.",
    price: 229,
    category: "meals",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
    vegetarian: false,
    spicy: true,
  },

  // Beverages
  {
    id: "13",
    name: "Filter Coffee",
    description:
      "Traditional South Indian filter coffee — strong decoction blended with frothy hot milk, served in a steel tumbler and davara.",
    price: 49,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=600&h=400&fit=crop",
    featured: true,
    vegetarian: true,
  },
  {
    id: "14",
    name: "Masala Chai",
    description:
      "Rich, spiced tea brewed with cardamom, ginger, cinnamon, and cloves. The perfect warm embrace in a cup.",
    price: 39,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "15",
    name: "Buttermilk",
    description:
      "Refreshing spiced buttermilk with curry leaves, ginger, and a hint of asafoetida. Cool and digestive.",
    price: 35,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "16",
    name: "Mango Lassi",
    description:
      "Creamy yogurt smoothie blended with ripe Alphonso mangoes and a touch of cardamom. Sweet tropical bliss.",
    price: 69,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "17",
    name: "Fresh Lime Soda",
    description:
      "Sparkling soda with fresh lime juice, a pinch of salt, and a touch of sugar. Zesty and refreshing.",
    price: 45,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=400&fit=crop",
    vegetarian: true,
  },
  {
    id: "18",
    name: "Rose Milk",
    description:
      "Chilled milk infused with fragrant rose syrup and topped with basil seeds. A beloved South Indian cooler.",
    price: 55,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&h=400&fit=crop",
    vegetarian: true,
  },
];

export const categories = [
  { id: "breakfast", label: "Breakfast", icon: "🌅" },
  { id: "meals", label: "Meals", icon: "🍛" },
  { id: "beverages", label: "Beverages", icon: "☕" },
] as const;
