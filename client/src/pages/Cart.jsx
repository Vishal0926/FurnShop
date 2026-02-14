import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any furniture yet.</p>
                <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                    Start Shopping <ArrowRight className="ml-2" size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 space-y-4">
                    {cart.map(item => (
                        <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                                <p className="text-gray-500 text-sm">{item.category}</p>
                                <p className="text-accent font-bold mt-1">₹{item.price}</p>
                            </div>

                            <div className="flex items-center bg-gray-50 rounded-lg">
                                <button
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                    className="p-2 hover:bg-gray-200 rounded-l-lg"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-4 font-bold">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    className="p-2 hover:bg-gray-200 rounded-r-lg"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="text-right ml-4">
                                <p className="font-bold text-lg mb-2">₹{item.price * item.quantity}</p>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-xl text-primary mb-6">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                        <button className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
