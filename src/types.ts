export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  images: string[];
  rating: number;
  reviews: Review[];
  featured?: boolean;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'Tote' | 'Clutch' | 'Crossbody' | 'Shoulder Bag' | 'Backpack';
