import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="h-64 overflow-hidden relative group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md text-primary hover:text-accent hover:bg-gray-50 transition-colors"
                >
                    <ShoppingCart size={20} />
                </button>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm text-accent font-medium mb-1">{product.category}</p>
                        <h3 className="text-lg font-bold text-primary">{product.name}</h3>
                    </div>
                    <span className="text-lg font-bold text-primary">₹{product.price}</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center">
                    <span className="text-yellow-400 text-sm">★ {product.rating}</span>
                    <span className="text-gray-400 text-xs ml-2">({product.reviews} reviews)</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
