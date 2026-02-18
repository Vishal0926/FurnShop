import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

const categories = [
    { name: 'Indoor', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80' },
    { name: 'Outdoor', image: 'https://shopatzing.com/product_images/uploaded_images/theme-of-tranquility.jpg' },
    { name: 'Office', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' },
    { name: 'Decoration', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80' },
];

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API_URL}/products`);
                setFeaturedProducts(res.data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center text-center bg-gray-900 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1920&q=80')" }}
                />
                <div className="relative z-10 max-w-3xl px-6">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Design Your Dream Home</h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">Premium furniture for every corner of your life.</p>
                    <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-opacity-90 transition-all text-lg">
                        Shop Collection <ArrowRight className="ml-2" />
                    </Link>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 px-6 container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary">Browse by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat) => (
                        <Link to={`/shop?category=${cat.name}`} key={cat.name} className="group overflow-hidden rounded-xl relative h-80 shadow-lg">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                                <h3 className="text-2xl font-bold text-white tracking-wider">{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-primary">Featured Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/shop" className="text-accent font-bold hover:underline text-lg">View All Products</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
