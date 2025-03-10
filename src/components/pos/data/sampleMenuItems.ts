
import { MenuItem } from "@/components/pos/types";

export const sampleProducts: MenuItem[] = [
  {
    id: "prod1",
    name: "Beef Ribs",
    price: 15000,
    description: "Slow-cooked tender beef ribs",
    image_url: "/lovable-uploads/6d4c469f-6bac-4583-9cc5-654712a55973.png",
    category: "Nyama Choma"
  },
  {
    id: "prod2",
    name: "Goat Meat",
    price: 12000,
    description: "Grilled goat meat with spices",
    image_url: "/lovable-uploads/6d4c469f-6bac-4583-9cc5-654712a55973.png",
    category: "Nyama Choma"
  },
  {
    id: "prod3",
    name: "Grilled Chicken",
    price: 10000,
    description: "Whole grilled chicken with spices",
    image_url: "/lovable-uploads/6d4c469f-6bac-4583-9cc5-654712a55973.png",
    category: "Kuku"
  },
  {
    id: "prod4",
    name: "Chicken Wings",
    price: 8000,
    description: "Spicy grilled chicken wings",
    image_url: "",
    category: "Kuku"
  },
  {
    id: "prod5",
    name: "Chips Masala",
    price: 5000,
    description: "Fries with special masala seasoning",
    image_url: "",
    category: "Chips"
  },
  {
    id: "prod6",
    name: "Ugali",
    price: 2000,
    description: "Traditional corn meal dish",
    image_url: "",
    category: "Ugali"
  },
  {
    id: "prod7",
    name: "Pilau Rice",
    price: 4000,
    description: "Spiced rice with aromatic spices",
    image_url: "",
    category: "Rice"
  },
  {
    id: "prod8",
    name: "Soda",
    price: 1500,
    description: "Assorted soft drinks",
    image_url: "",
    category: "Beverages"
  }
];

export const defaultCategories: string[] = [
  "Nyama Choma", "Kuku", "Chips", "Ugali", "Rice", "Beverages"
];
