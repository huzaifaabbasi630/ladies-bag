import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-3xl font-serif mb-6">Product not found</h1>
        <Link to="/shop" className="text-sm uppercase tracking-widest border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-brand-gold transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-brand-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto max-h-[600px] scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-24 luxury-border overflow-hidden transition-luxury ${activeImage === idx ? 'ring-1 ring-brand-gold' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-brand-beige luxury-border">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-gold mb-4 font-medium">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-6">
                <p className="text-2xl font-medium text-brand-black">${product.price.toLocaleString()}</p>
                <div className="flex items-center space-x-2 border-l border-brand-beige pl-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">({product.rating} Rating)</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm max-w-lg">
              {product.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-brand-beige px-4 py-3">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 hover:text-brand-gold transition-colors">-</button>
                  <span className="px-6 text-sm font-medium w-16 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="px-3 hover:text-brand-gold transition-colors">+</button>
                </div>
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-brand-black text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury flex items-center justify-center space-x-3"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-full py-4 uppercase tracking-widest text-xs border transition-luxury flex items-center justify-center space-x-3 ${isInWishlist(product.id) ? 'bg-brand-pink border-brand-pink text-white' : 'border-brand-black hover:bg-brand-black hover:text-white'}`}
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-brand-beige">
              <div className="flex flex-col items-center text-center space-y-3">
                <Truck className="w-6 h-6 text-brand-gold" />
                <p className="text-[10px] uppercase tracking-widest font-medium">Free Shipping</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 border-x border-brand-beige">
                <RotateCcw className="w-6 h-6 text-brand-gold" />
                <p className="text-[10px] uppercase tracking-widest font-medium">30-Day Returns</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <ShieldCheck className="w-6 h-6 text-brand-gold" />
                <p className="text-[10px] uppercase tracking-widest font-medium">Authenticity Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif mb-4 uppercase tracking-widest">You May Also Like</h2>
              <div className="w-20 h-0.5 bg-brand-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
