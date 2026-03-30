import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck, RotateCcw, CreditCard, MapPin, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '', zip: '', card: '', expiry: '', cvc: '' });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    clearCart();
    window.scrollTo(0, 0);
  };

  if (step === 'success') {
    return (
      <div className="pt-40 pb-24 text-center max-w-2xl mx-auto px-6">
        <div className="w-24 h-24 bg-brand-beige/30 rounded-full flex items-center justify-center mx-auto mb-10 luxury-border">
          <ShieldCheck className="w-12 h-12 text-brand-gold" />
        </div>
        <h1 className="text-5xl font-serif mb-6 uppercase tracking-widest">Order Confirmed</h1>
        <p className="text-gray-600 mb-12 leading-relaxed">
          Thank you for choosing Aura. Your order has been placed successfully and is being prepared for shipment. You will receive a confirmation email shortly.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-brand-black text-white px-12 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0 && step === 'cart') {
    return (
      <div className="pt-40 pb-24 text-center max-w-2xl mx-auto px-6">
        <div className="w-24 h-24 bg-brand-beige/30 rounded-full flex items-center justify-center mx-auto mb-10 luxury-border">
          <ShoppingBag className="w-12 h-12 text-brand-gold" />
        </div>
        <h1 className="text-5xl font-serif mb-6 uppercase tracking-widest">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-12 leading-relaxed">
          It looks like you haven't added anything to your cart yet. Explore our latest collections and find your perfect companion.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-brand-black text-white px-12 py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-center space-x-10 mb-20">
          <div className={`flex items-center space-x-3 ${step === 'cart' ? 'text-brand-gold' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-medium ${step === 'cart' ? 'border-brand-gold' : 'border-gray-200'}`}>01</span>
            <span className="text-[10px] uppercase tracking-widest font-medium">Shopping Cart</span>
          </div>
          <div className="w-20 h-px bg-gray-200" />
          <div className={`flex items-center space-x-3 ${step === 'checkout' ? 'text-brand-gold' : 'text-gray-400'}`}>
            <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-medium ${step === 'checkout' ? 'border-brand-gold' : 'border-gray-200'}`}>02</span>
            <span className="text-[10px] uppercase tracking-widest font-medium">Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <AnimatePresence mode="wait">
              {step === 'cart' ? (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-serif uppercase tracking-widest mb-10">Shopping Cart</h2>
                  <div className="space-y-8">
                    {cart.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center gap-8 py-8 border-b border-brand-beige group">
                        <div className="w-32 aspect-[3/4] overflow-hidden luxury-border bg-brand-beige">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 space-y-4 text-center sm:text-left">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-1">{item.category}</p>
                            <h3 className="text-xl font-serif">{item.name}</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Color: {item.color}</p>
                          </div>
                          <p className="text-lg font-medium">${item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center border border-brand-beige px-4 py-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 hover:text-brand-gold transition-colors">-</button>
                          <span className="px-6 text-sm font-medium w-12 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 hover:text-brand-gold transition-colors">+</button>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="text-lg font-medium mb-4">${(item.price * item.quantity).toLocaleString()}</p>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-brand-pink transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="checkout"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <h2 className="text-3xl font-serif uppercase tracking-widest mb-10">Checkout Details</h2>
                  <form onSubmit={handleCheckout} id="checkout-form" className="space-y-10">
                    {/* Shipping */}
                    <div className="space-y-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <MapPin className="w-5 h-5 text-brand-gold" />
                        <h3 className="text-lg uppercase tracking-widest font-medium">Shipping Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Full Name</label>
                          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest" placeholder="ENTER YOUR NAME" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Email Address</label>
                          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest" placeholder="ENTER YOUR EMAIL" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Shipping Address</label>
                          <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest" placeholder="STREET ADDRESS, APARTMENT, ETC." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">City</label>
                          <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest" placeholder="CITY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">ZIP Code</label>
                          <input type="text" required value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest" placeholder="ZIP CODE" />
                        </div>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="space-y-8 pt-10 border-t border-brand-beige">
                      <div className="flex items-center space-x-4 mb-6">
                        <CreditCard className="w-5 h-5 text-brand-gold" />
                        <h3 className="text-lg uppercase tracking-widest font-medium">Payment Method</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Card Number</label>
                          <input type="text" required value={formData.card} onChange={(e) => setFormData({ ...formData, card: e.target.value })} className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest" placeholder="XXXX XXXX XXXX XXXX" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Expiry Date</label>
                          <input type="text" required value={formData.expiry} onChange={(e) => setFormData({ ...formData, expiry: e.target.value })} className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">CVC</label>
                          <input type="text" required value={formData.cvc} onChange={(e) => setFormData({ ...formData, cvc: e.target.value })} className="w-full bg-transparent border-b border-brand-beige py-4 focus:outline-none focus:border-brand-gold text-sm uppercase tracking-widest" placeholder="XXX" />
                        </div>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-brand-beige/20 p-10 luxury-border sticky top-32 space-y-10">
              <h3 className="text-2xl font-serif uppercase tracking-widest">Order Summary</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-brand-gold">Free</span>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span className="text-gray-500">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="pt-6 border-t border-brand-beige flex justify-between text-lg font-medium">
                  <span className="uppercase tracking-widest">Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full bg-brand-black text-white py-5 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury flex items-center justify-center space-x-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-brand-black text-white py-5 uppercase tracking-widest text-sm hover:bg-brand-gold transition-luxury flex items-center justify-center space-x-4"
                >
                  <span>Complete Purchase</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              )}

              {step === 'checkout' && (
                <button
                  onClick={() => setStep('cart')}
                  className="w-full text-center text-[10px] uppercase tracking-widest text-gray-400 hover:text-brand-black transition-colors"
                >
                  Back to Shopping Cart
                </button>
              )}

              <div className="pt-10 space-y-6">
                <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest text-gray-500">
                  <Truck className="w-4 h-4 text-brand-gold" />
                  <span>Complimentary Express Shipping</span>
                </div>
                <div className="flex items-center space-x-4 text-[10px] uppercase tracking-widest text-gray-500">
                  <RotateCcw className="w-4 h-4 text-brand-gold" />
                  <span>30-Day Complimentary Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
