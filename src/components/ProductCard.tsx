import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-beige luxury-border">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-3 rounded-full transition-colors ${isInWishlist(product.id) ? 'bg-brand-pink text-white' : 'bg-white text-brand-black hover:bg-brand-gold hover:text-white'}`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => addToCart(product)}
            className="p-3 bg-white text-brand-black rounded-full hover:bg-brand-gold hover:text-white transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-3 bg-white text-brand-black rounded-full hover:bg-brand-gold hover:text-white transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block text-lg font-serif hover:text-brand-gold transition-colors">
          {product.name}
        </Link>
        <p className="mt-2 text-brand-gold font-medium">${product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
