const mongoose = require('mongoose');
const Product = require('./models/Product');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/furniture-shop')
    .then(async () => {
        console.log('Connected to MongoDB...');
        try {
            const products = await Product.find({});
            console.log(`Found ${products.length} products.`);

            const dumpPath = path.join(__dirname, 'products_dump.json');
            fs.writeFileSync(dumpPath, JSON.stringify(products, null, 2));
            console.log(`Products dumped to ${dumpPath}`);

        } catch (error) {
            console.error('Error:', error);
        }
        mongoose.disconnect();
    })
    .catch(err => console.error('Connection Error:', err));
