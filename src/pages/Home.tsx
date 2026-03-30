import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';

const Home: React.FC = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  const categories = [
    { name: 'Tote', image: 'https://picsum.photos/seed/cat-tote/600/800' },
    { name: 'Clutch', image: 'https://picsum.photos/seed/cat-clutch/600/800' },
    { name: 'Crossbody', image: 'https://picsum.photos/seed/cat-cross/600/800' },
    { name: 'Shoulder Bag', image: 'https://picsum.photos/seed/cat-shoulder/600/800' },
  ];

  const testimonials = [
    { name: 'Isabella Rossi', role: 'Fashion Blogger', text: 'The quality of Aura handbags is unmatched. Every detail is perfect.', rating: 5 },
    { name: 'Elena Moretti', role: 'Creative Director', text: 'Elegant, timeless, and functional. My Aura tote is my daily essential.', rating: 5 },
    { name: 'Sofia Bianchi', role: 'Model', text: 'I love the minimalist aesthetic. It complements every outfit perfectly.', rating: 5 },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/hero-handbag/1920/1080"
            alt="Hero Luxury"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-brand-gold uppercase tracking-[0.3em] text-sm mb-6 font-medium"
          >
            The New Collection 2024
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif mb-10 leading-tight"
          >
            Elegance in Every Detail
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center space-x-3 bg-white text-brand-black px-10 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-white transition-luxury group"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Featured Selection</h2>
            <div className="w-20 h-0.5 bg-brand-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/shop" className="text-sm uppercase tracking-widest border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-brand-beige/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Shop by Category</h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs">Find your perfect companion</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link key={idx} to={`/shop?category=${cat.name}`} className="group relative aspect-[3/4] overflow-hidden luxury-border">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif tracking-widest uppercase">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/promo-bag/1920/800"
            alt="Promo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Limited Edition: The Midnight Series</h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Discover our most exclusive collection yet. Hand-stitched with premium leather and finished with 24k gold-plated hardware.</p>
          <Link
            to="/shop"
            className="inline-block border border-white px-12 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-brand-black transition-luxury"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">What Our Clients Say</h2>
            <div className="w-20 h-0.5 bg-brand-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-10 bg-brand-beige/20 luxury-border text-center flex flex-col items-center">
                <Quote className="w-10 h-10 text-brand-gold/30 mb-6" />
                <div className="flex space-x-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <h4 className="font-serif text-lg">{t.name}</h4>
                <p className="text-xs uppercase tracking-widest text-brand-gold mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-brand-beige">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif mb-6">Join the Aura Circle</h2>
          <p className="text-gray-600 mb-10 uppercase tracking-widest text-xs">Subscribe for exclusive updates and early access to new collections.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="flex-1 bg-white border border-transparent px-6 py-4 focus:outline-none focus:border-brand-gold uppercase tracking-widest text-xs"
              required
            />
            <button
              type="submit"
              className="bg-brand-black text-white px-12 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
