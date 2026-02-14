import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Menu, X } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryQuery = queryParams.get('category');
    const searchQuery = queryParams.get('search');

    // Sidebar state: hidden by default
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(categoryQuery || 'All');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = 'http://localhost:5000/api/products';
                const params = {};

                if (selectedCategory && selectedCategory !== 'All') {
                    params.category = selectedCategory;
                }

                // If search query exists from URL, it overrides category unless manually changed? 
                // Let's mix them.
                if (searchQuery) {
                    params.search = searchQuery;
                }

                const res = await axios.get(url, { params });
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory, searchQuery]);

    useEffect(() => {
        if (categoryQuery) {
            setSelectedCategory(categoryQuery);
        }
    }, [categoryQuery]);

    const categories = ['All', 'Indoor', 'Outdoor', 'Office', 'Decoration'];

    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat);
        setIsSidebarOpen(false); // Close sidebar on selection
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Shop Furniture</h1>

            <div className="flex flex-col md:flex-row gap-8 relative">
                {/* Sidebar Toggle Button (Visible when sidebar is closed) */}
                {!isSidebarOpen && (
                    <div className="md:w-16 flex-shrink-0">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 text-primary transition-colors flex flex-col items-center gap-1 group"
                            title="Open Filters"
                        >
                            <Menu size={24} />
                            <span className="text-[10px] font-bold group-hover:text-accent">FILTERS</span>
                        </button>
                    </div>
                )}

                {/* Sidebar Filters (Visible when open) */}
                {isSidebarOpen && (
                    <aside className="w-full md:w-1/4 relative z-10">
                        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24 border border-gray-100">
                            <div className="flex justify-between items-center mb-6 border-b pb-2">
                                <h3 className="text-xl font-bold text-primary">Categories</h3>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <ul className="space-y-3">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => handleCategorySelect(cat)}
                                            className={`w-full text-left py-3 px-4 rounded-lg transition-all transform hover:translate-x-1 ${selectedCategory === cat
                                                ? 'bg-primary text-white shadow-md'
                                                : 'hover:bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                )}

                {/* Product Grid */}
                <main className={`w-full transition-all duration-300 ${isSidebarOpen ? 'md:w-3/4' : 'flex-1'}`}>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-500">Showing {products.length} results</p>
                                {selectedCategory !== 'All' && (
                                    <div className="bg-accent/10 px-3 py-1 rounded-full text-sm text-accent font-medium">
                                        Filter: {selectedCategory}
                                    </div>
                                )}
                            </div>

                            {products.length === 0 ? (
                                <div className="text-center py-20 bg-gray-50 rounded-xl">
                                    <h3 className="text-2xl font-bold text-gray-400">No products found</h3>
                                    <button onClick={() => handleCategorySelect('All')} className="mt-4 text-accent hover:underline">Clear Filters</button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;
