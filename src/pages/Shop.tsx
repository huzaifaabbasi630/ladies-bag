import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X, Search } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = searchParams.get('category') || 'All';
  const activeColor = searchParams.get('color') || 'All';
  const minPrice = Number(searchParams.get('min')) || 0;
  const maxPrice = Number(searchParams.get('max')) || 5000;

  const categories: string[] = ['All', 'Tote', 'Clutch', 'Crossbody', 'Shoulder Bag', 'Backpack'];
  const colors: string[] = ['All', 'Black', 'Beige', 'Gold', 'Soft Pink'];

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const catMatch = activeCategory === 'All' || p.category === activeCategory;
      const colorMatch = activeColor === 'All' || p.color === activeColor;
      const priceMatch = p.price >= minPrice && p.price <= maxPrice;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && colorMatch && priceMatch && searchMatch;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, activeColor, minPrice, maxPrice, sortBy, searchQuery]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchQuery('');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif mb-4 uppercase tracking-widest">Shop Collection</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">Discover our latest arrivals and timeless classics</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 space-y-6 lg:space-y-0 border-y border-brand-beige py-6">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 text-sm uppercase tracking-widest hover:text-brand-gold transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="SEARCH PRODUCTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-b border-brand-beige focus:outline-none focus:border-brand-gold text-xs uppercase tracking-widest w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs uppercase tracking-widest text-gray-400">{filteredProducts.length} Products</span>
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border-none text-sm uppercase tracking-widest focus:outline-none cursor-pointer pr-6"
              >
                <option value="featured">Sort By: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters (Desktop) */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="hidden lg:block space-y-10 overflow-hidden pr-8 border-r border-brand-beige"
              >
                <div>
                  <h4 className="text-sm uppercase tracking-widest font-medium mb-6">Categories</h4>
                  <div className="space-y-3">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateFilter('category', cat)}
                        className={`block text-sm uppercase tracking-widest hover:text-brand-gold transition-colors ${activeCategory === cat ? 'text-brand-gold font-medium' : 'text-gray-500'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase tracking-widest font-medium mb-6">Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => updateFilter('color', color)}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-luxury ${activeColor === color ? 'bg-brand-black text-white border-brand-black' : 'border-brand-beige hover:border-brand-gold'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm uppercase tracking-widest font-medium mb-6">Price Range</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={maxPrice}
                      onChange={(e) => updateFilter('max', e.target.value)}
                      className="w-full h-1 bg-brand-beige rounded-lg appearance-none cursor-pointer accent-brand-gold"
                    />
                    <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-500">
                      <span>$0</span>
                      <span>Up to ${maxPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-3 border border-brand-black text-xs uppercase tracking-widest hover:bg-brand-black hover:text-white transition-luxury"
                >
                  Clear All
                </button>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32">
                <p className="text-lg font-serif mb-6">No products found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-sm uppercase tracking-widest border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
