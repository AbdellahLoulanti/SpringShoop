
export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: {
    value: number;
    currency: string;
  };
  rating: number;
  sales: number;
}

export interface ProductDetail extends Product {
  description: string;
  images: string[];
  shipping: {
    price: number;
    estimatedDelivery: string;
  };
  store: {
    name: string;
    rating: number;
  };
  specs: { key: string; value: string }[];
}


export interface CartItem {
  product: Product;
  quantity: number;
}
