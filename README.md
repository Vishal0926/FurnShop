# Swain Furniture - MERN Stack E-Commerce Application

A modern, responsive furniture e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### User Features (Frontend)
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS.
- **Product Browsing**: View featured products on the Home page and filter by category in the Shop.
- **Search Functionality**: Quickly find furniture by name.
- **Product Details**: View images, prices, descriptions, and ratings.
- **Shopping Cart**: Add, remove, and update quantities of items.
- **User Authentication**: Secure Login and Registration using JWT.
- **Automatic Redirect**: Automatic redirect to Home page upon logout.

### Admin Features (Backend Panel)
- **Admin Dashboard**: Secure access (Role-based) to manage products.
- **Product Management**:
    - **Add Products**: Create new listings with Name, Price, Category, Description.
    - **Image Upload**: Upload product images directly from your computer or use an external URL.
    - **Edit/Delete**: Update existing product details or remove them.
- **Secure API**: Protected routes ensuring only Admins can modify data.

## Tech Stack

### Frontend
- **React**: Component-based UI library.
- **Vite**: Fast build tool and dev server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Client-side routing.
- **Context API**: State management for Authentication and Cart.
- **Lucide React**: Modern iconography.
- **Axios**: HTTP client for API requests.

### Backend
- **Node.js & Express**: Server-side runtime and framework.
- **MongoDB & Mongoose**: NoSQL database and ODM.
- **Multer**: Middleware for handling `multipart/form-data` (file uploads).
- **JsonWebToken (JWT)**: Secure authentication.
- **Bcryptjs**: Password hashing.
- **Cors**: Cross-Origin Resource Sharing.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local instance or Atlas URI)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/swain-furniture.git
    cd swain-furniture
    ```

2.  **Install Dependencies (Root - Recursive or Manual):**
    
    *Server:*
    ```bash
    cd server
    npm install
    ```

    *Client:*
    ```bash
    cd ../client
    npm install
    ```

### Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd server
    npm run dev
    # Server runs on http://localhost:5000
    ```

2.  **Start the Frontend Client:**
    ```bash
    cd client
    npm run dev
    # Client runs on http://localhost:5173
    ```

## Project Structure

```
swain-furniture/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (Auth, Cart)
│   │   ├── pages/          # Page components (Home, Shop, Admin)
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── server/                 # Backend Node.js application
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth and error handling middleware
│   ├── models/             # Mongoose schemas (User, Product)
│   ├── routes/             # API route definitions
│   ├── uploads/            # Directory for uploaded images
│   ├── index.js            # Server entry point
│   └── package.json
│
└── README.md               # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Products
- `GET /api/products` - Get all products (supports query params: `search`, `category`)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Upload
- `POST /api/upload` - Upload an image file

## License

This project is licensed under the MIT License.
