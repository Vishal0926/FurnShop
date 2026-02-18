import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import API_URL, { BASE_URL } from '../../config';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(''); // Stores URL or path
    const [category, setCategory] = useState('Indoor');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [imageType, setImageType] = useState('url'); // 'url' or 'file'

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
        } else if (id) {
            fetchProduct();
        }
    }, [user, navigate, id]);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/products/${id}`);
            setName(data.name);
            setPrice(data.price);
            setImage(data.image);
            setCategory(data.category);
            setDescription(data.description);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.token}`, // Optional if upload route is public, but good practice
                },
            };

            const { data } = await axios.post(`${API_URL}/upload`, formData, config);

            // Backend returns path like '/uploads/image.jpg'
            // We need to make it a full URL for the frontend to display if it's served statically
            // Or just store the relative path and handle display elsewhere.
            // For simplicity, let's store the full URL if possible, or just the relative path and assume <img src={...}> works.
            // Since we set up static serving, 'http://localhost:5000/uploads/...' should work.
            // The backend returns '/uploads/...'
            setImage(`${BASE_URL}${data}`);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Please provide an image URL or upload an image');
            return;
        }

        const productData = {
            name,
            price: Number(price),
            image,
            category,
            description
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        };

        try {
            if (id) {
                await axios.put(`${API_URL}/products/${id}`, productData, config);
            } else {
                await axios.post(`${API_URL}/products`, productData, config);
            }
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error saving product:', error);
            const message = error.response?.data?.message || 'Failed to save product';
            alert(message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Product' : 'Add Product'}</h1>
            <form onSubmit={submitHandler} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image Source</label>
                    <div className="flex mb-2">
                        <label className="inline-flex items-center mr-6">
                            <input
                                type="radio"
                                className="form-radio text-primary"
                                name="imageType"
                                value="url"
                                checked={imageType === 'url'}
                                onChange={() => setImageType('url')}
                            />
                            <span className="ml-2">Image URL</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-primary"
                                name="imageType"
                                value="file"
                                checked={imageType === 'file'}
                                onChange={() => setImageType('file')}
                            />
                            <span className="ml-2">Upload File</span>
                        </label>
                    </div>

                    {imageType === 'url' ? (
                        <input
                            type="text"
                            placeholder="Enter image url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required={imageType === 'url'}
                        />
                    ) : (
                        <input
                            type="file"
                            onChange={uploadFileHandler}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    )}
                    {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                    {image && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Preview:</p>
                            <img src={image} alt="Preview" className="h-20 w-auto object-cover rounded border" />
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Office">Office</option>
                        <option value="Decoration">Decoration</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    {id ? 'Update Product' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
