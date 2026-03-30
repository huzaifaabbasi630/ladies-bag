import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-serif tracking-widest uppercase">
            Aura
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Crafting elegance for the modern woman. Our handbags are a blend of timeless design and premium craftsmanship.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-gold transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-brand-gold transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-brand-gold transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-serif mb-6 uppercase tracking-widest text-brand-gold">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-lg font-serif mb-6 uppercase tracking-widest text-brand-gold">Customer Care</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/care" className="hover:text-white transition-colors">Product Care</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-serif mb-6 uppercase tracking-widest text-brand-gold">Get in Touch</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span>123 Luxury Ave, Milan, Italy</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>+39 02 1234 5678</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-brand-gold" />
              <span>contact@aurahandbags.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Aura Luxury Handbags. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
