import type { Category, Product, ProductDetail } from '../types';

// ===================================================================================
// MOCK DATA - In a real app, this data would come from a secure backend API
// ===================================================================================

export const mockCategories: Category[] = [
  { id: 'women-clothing', name: "Women's Clothing" },
  { id: 'men-clothing', name: "Men's Clothing" },
  { id: 'cellphones', name: 'Cellphones & Telecommunications' },
  { id: 'computer-office', name: 'Computer & Office' },
  { id: 'consumer-electronics', name: 'Consumer Electronics' },
  { id: 'jewelry-accessories', name: 'Jewelry & Accessories' },
  { id: 'home-garden', name: 'Home & Garden' },
  { id: 'shoes', name: 'Shoes' },
];

// Changed to `let` to allow modifications for CRUD operations
export let mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: `P${1000 + i}`,
  title: `Summer Floral Print Dress ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/${1000 + i}/400/500`,
  price: { value: parseFloat((Math.random() * 50 + 10).toFixed(2)), currency: 'USD' },
  rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
  sales: Math.floor(Math.random() * 5000) + 100,
}));

const mockProductDetail: ProductDetail = {
  id: 'P1000',
  title: 'Elegant V-Neck Floral Maxi Dress',
  imageUrl: 'https://picsum.photos/seed/P1000/600/800',
  price: { value: 29.99, currency: 'USD' },
  rating: 4.8,
  sales: 1245,
  description: "A beautiful and elegant maxi dress perfect for summer occasions. Featuring a vibrant floral pattern, a flattering V-neck, and a comfortable, lightweight fabric. This dress is perfect for beach trips, parties, or casual outings.",
  images: [
    'https://picsum.photos/seed/P1000-1/600/800',
    'https://picsum.photos/seed/P1000-2/600/800',
    'https://picsum.photos/seed/P1000-3/600/800',
    'https://picsum.photos/seed/P1000-4/600/800',
  ],
  shipping: {
    price: 0.00,
    estimatedDelivery: '15-25 days',
  },
  store: {
    name: 'FashionForward Boutique',
    rating: 4.7,
  },
  specs: [
    { key: 'Material', value: 'Polyester, Spandex' },
    { key: 'Silhouette', value: 'A-Line' },
    { key: 'Neckline', value: 'V-Neck' },
    { key: 'Sleeve Length', value: 'Sleeveless' },
    { key: 'Season', value: 'Summer' },
  ]
};

// ===================================================================================
// MOCK API FUNCTIONS - Simulate network delay
// ===================================================================================

const apiDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * NOTE: This is a mock service. In a real-world application, these functions
 * would make fetch requests to your own secure, serverless backend routes
 * (e.g., GET /api/ali/categories) which would then call the RapidAPI endpoints.
 * This prevents exposing your API key on the client-side.
 */

export const aliExpressService = {
  getCategories: async (): Promise<Category[]> => {
    console.log("Mock API: Fetching categories...");
    await apiDelay(500);
    return mockCategories;
  },

  searchProducts: async (query: string, page: number = 1): Promise<Product[]> => {
    console.log(`Mock API: Searching for "${query}" on page ${page}...`);
    await apiDelay(1000);
    return [...mockProducts].sort(() => Math.random() - 0.5);
  },
  
  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    console.log(`Mock API: Fetching products for category "${categoryId}"...`);
    await apiDelay(1000);
    return [...mockProducts].sort(() => Math.random() - 0.5);
  },

  getProductById: async (id: string): Promise<ProductDetail> => {
    console.log(`Mock API: Fetching product details for ID "${id}"...`);
    await apiDelay(800);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return {
        ...mockProductDetail,
        ...product,
        images: [
            `https://picsum.photos/seed/${id}-1/600/800`,
            `https://picsum.photos/seed/${id}-2/600/800`,
            `https://picsum.photos/seed/${id}-3/600/800`,
        ]
    };
  },
  
  addProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    console.log("Mock API: Adding new product...");
    await apiDelay(500);
    const newProduct: Product = {
      ...productData,
      id: `P${Date.now()}`
    };
    mockProducts.unshift(newProduct);
    return newProduct;
  },
  
  updateProduct: async (productId: string, productData: Partial<Product>): Promise<Product> => {
     console.log(`Mock API: Updating product ${productId}...`);
     await apiDelay(500);
     let productToUpdate = mockProducts.find(p => p.id === productId);
     if (!productToUpdate) {
       throw new Error("Product not found for update");
     }
     Object.assign(productToUpdate, productData);
     return productToUpdate;
  },
  
  deleteProduct: async (productId: string): Promise<void> => {
    console.log(`Mock API: Deleting product ${productId}...`);
    await apiDelay(500);
    mockProducts = mockProducts.filter(p => p.id !== productId);
  }
};
