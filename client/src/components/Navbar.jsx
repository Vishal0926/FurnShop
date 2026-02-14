import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

import appIcon from '../assets/icon/app_icon.png';

const Navbar = () => {
    const { cart } = useCart();
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/shop?search=${search}`);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-primary font-serif">Swain Furniture</span>
                        <img src={appIcon} alt="Logo" className="w-20 h-20 object-contain" />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-500 font-medium tracking-wider uppercase">Your Ultimate Destination to Find The Best</span>
                </Link>

                <div className="hidden md:flex flex-1 mx-10">
                    <form onSubmit={handleSearch} className="w-full relative">
                        <input
                            type="text"
                            placeholder="Search furniture..."
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-accent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-accent">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-accent font-medium">Home</Link>
                    <Link to="/shop" className="text-gray-600 hover:text-accent font-medium">Shop</Link>
                    <Link to="/cart" className="relative text-gray-600 hover:text-accent">
                        <ShoppingCart size={24} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <>
                            {user.isAdmin && (
                                <Link to="/admin/dashboard" className="text-gray-600 hover:text-accent font-medium">Dashboard</Link>
                            )}
                            <span className="text-gray-600 font-medium">Hello, {user.name}</span>
                            <button onClick={logout} className="text-gray-600 hover:text-accent font-medium">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-gray-600 hover:text-accent font-medium">Login</Link>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-4">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 rounded border border-gray-300"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <Link to="/" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/shop" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>Shop</Link>
                    <Link to="/cart" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>Cart ({cart.length})</Link>
                    {user ? (
                        <>
                            <span className="block text-gray-600 font-medium">Hello, {user.name}</span>
                            <button onClick={() => { logout(); setIsOpen(false); }} className="block text-gray-600 font-medium text-left w-full">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="block text-gray-600 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
