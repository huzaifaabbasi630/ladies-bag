import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'The Classic Tote',
    price: 1250,
    category: 'Tote',
    color: 'Black',
    description: 'A timeless silhouette crafted from premium Italian leather. Perfect for the modern woman on the go.',
    images: [
      'https://picsum.photos/seed/tote1/800/1000',
      'https://picsum.photos/seed/tote2/800/1000',
      'https://picsum.photos/seed/tote3/800/1000'
    ],
    rating: 4.8,
    featured: true,
    reviews: [
      { id: 'r1', user: 'Sophia L.', rating: 5, comment: 'Absolutely stunning quality.', date: '2024-02-15' }
    ]
  },
  {
    id: '2',
    name: 'Aura Evening Clutch',
    price: 850,
    category: 'Clutch',
    color: 'Gold',
    description: 'An elegant evening companion with gold-toned hardware and a sleek satin finish.',
    images: [
      'https://picsum.photos/seed/clutch1/800/1000',
      'https://picsum.photos/seed/clutch2/800/1000'
    ],
    rating: 4.9,
    featured: true,
    reviews: []
  },
  {
    id: '3',
    name: 'Serene Crossbody',
    price: 950,
    category: 'Crossbody',
    color: 'Beige',
    description: 'Minimalist design meets functionality. Features an adjustable strap and multiple compartments.',
    images: [
      'https://picsum.photos/seed/crossbody1/800/1000',
      'https://picsum.photos/seed/crossbody2/800/1000'
    ],
    rating: 4.7,
    featured: true,
    reviews: []
  },
  {
    id: '4',
    name: 'Luxe Shoulder Bag',
    price: 1100,
    category: 'Shoulder Bag',
    color: 'Soft Pink',
    description: 'Soft, supple leather in a delicate pink hue. The perfect accessory for brunch or a day out.',
    images: [
      'https://picsum.photos/seed/shoulder1/800/1000',
      'https://picsum.photos/seed/shoulder2/800/1000'
    ],
    rating: 4.6,
    reviews: []
  },
  {
    id: '5',
    name: 'Urban Backpack',
    price: 1400,
    category: 'Backpack',
    color: 'Black',
    description: 'Luxury meets utility. A sophisticated backpack for the professional woman.',
    images: [
      'https://picsum.photos/seed/backpack1/800/1000',
      'https://picsum.photos/seed/backpack2/800/1000'
    ],
    rating: 4.8,
    reviews: []
  },
  {
    id: '6',
    name: 'Midnight Satchel',
    price: 1350,
    category: 'Shoulder Bag',
    color: 'Black',
    description: 'A structured satchel that exudes confidence and elegance.',
    images: [
      'https://picsum.photos/seed/satchel1/800/1000',
      'https://picsum.photos/seed/satchel2/800/1000'
    ],
    rating: 4.9,
    reviews: []
  }
];
