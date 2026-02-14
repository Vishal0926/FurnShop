const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
    {
        name: "Modern Leather Sofa",
        category: "Indoor",
        price: 1299,
        description: "A luxurious leather sofa perfect for modern living rooms.",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 28
    },
    {
        name: "Oak Dining Table",
        category: "Indoor",
        price: 899,
        description: "Solid oak dining table that seats 6 people.",
        image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 45
    },
    {
        name: "Ergonomic Office Chair",
        category: "Office",
        price: 299,
        description: "High-performance ergonomic chair for long work hours.",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
        rating: 4.2,
        reviews: 120
    },
    {
        name: "Patio Lounge Set",
        category: "Outdoor",
        price: 1599,
        description: "Weather-resistant lounge set for your patio or garden.",
        image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 15
    },
    {
        name: "Minimalist Desk Lamp",
        category: "Decoration",
        price: 89,
        description: "Elegant LED desk lamp with adjustable brightness.",
        image: "https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&w=800&q=80",
        rating: 4.3,
        reviews: 80
    },
    {
        name: "Bookshelf",
        category: "Office",
        price: 199,
        description: "5-tier bookshelf for organizing your office.",
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
        rating: 4.1,
        reviews: 32
    },
    {
        name: "Geometric Rug",
        category: "Decoration",
        price: 150,
        description: "Soft area rug with a modern geometric pattern.",
        image: "https://images.unsplash.com/photo-1575414023857-3371600b2195?auto=format&fit=crop&w=800&q=80",
        rating: 4.4,
        reviews: 55
    },
    {
        name: "Garden Bench",
        category: "Outdoor",
        price: 250,
        description: "Classic wooden garden bench.",
        image: "https://images.unsplash.com/photo-1595123951556-9d3bdfd812bd?auto=format&fit=crop&w=800&q=80",
        rating: 4.0,
        reviews: 10
    }
];

console.log('Starting seed script...');

mongoose.connect('mongodb://localhost:27017/furniture-shop')
    .then(async () => {
        console.log('MongoDB Connected for Seeding');
        try {
            await Product.deleteMany({});
            console.log('Current products cleared');

            await Product.insertMany(products);
            console.log('Data Seeded Successfully');
        } catch (error) {
            console.error('Error during seeding:', error);
        }
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Seeding Error:', err);
        mongoose.disconnect();
    });
