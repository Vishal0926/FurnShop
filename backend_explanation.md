# Backend Architecture Explained: From Scratch to End

This document explains how the backend of the **Swain Furniture** application was built, step-by-step. It uses the **MERN Stack** (MongoDB, Express, React, Node.js), where the backend is powered by Node.js and Express.

## 1. The Foundation: Server Setup (`server/index.js`)

Everything starts here. This file is the entry point of your application.

-   **Express App**: We initialize an Express application (`const app = express()`). This app handles all incoming requests (API calls) from the frontend.
-   **Middleware**:
    -   `cors()`: Allows your frontend (running on port 5173) to talk to your backend (running on port 5000). Without this, the browser would block the connection for security.
    -   `express.json()`: Allows the server to understand JSON data sent in request bodies (like when you send login details).
    -   `express.static()`: Configures the server to serve uploaded images directly from the `uploads` folder.
-   **Database Connection**: We use `mongoose.connect()` to connect to your MongoDB database. This is the bridge between your code and your data.
-   **Routes**: We tell the app to use specific route files for different parts of the API (e.g., `/api/products` goes to `productRoutes`).

## 2. The Blueprint: Data Models (`server/models`)

Before we can save data, we need to define what it looks like. We use **Mongoose Schemas** for this.

-   **Product Model (`Product.js`)**: Defines that every product must have a `name`, `price`, `category`, `description`, and `image`. It enforces data consistency (e.g., price MUST be a number).
-   **User Model (`User.js`)**: Defines user data (`name`, `email`, `password`, `isAdmin`).
    -   **Password Hashing**: Inside this model, we use a `pre('save')` hook. This is a piece of code that runs *before* a user is saved to the database. It uses `bcryptjs` to encrypt the password so even if the database is hacked, the real passwords are safe.

## 3. The Logic: Controllers (`server/controllers`)

Controllers contain the actual business logic. They answer the question: "What should happen when a user requests this?"

-   **Product Controller (`productController.js`)**:
    -   `getProducts`: Fetches products from the database. It handles logic for **filtering** (by category) and **searching** (by name) by building a dynamic MongoDB query.
    -   `createProduct`: Takes data from the request body (`req.body`) and creates a new `Product` instance in the database.
-   **Auth Controller (`authController.js`)**:
    -   `login`: Checks if the email exists and if the password matches the hashed password in the database.
    -   **JWT Token**: If the login is successful, it generates a **JSON Web Token (JWT)**. This token is like a digital ID card that the user's browser saves. It's sent with future requests to prove who they are.

## 4. The Traffic Cop: Routes (`server/routes`)

Routes decide which controller function should handle which URL.

-   **Product Routes (`productRoutes.js`)**:
    -   `GET /`: Calls `productController.getProducts`.
    -   `POST /`: Calls `productController.createProduct`.
    -   **Protection**: Notice how some routes have `protect` and `admin` middleware inserted before the controller? `router.post('/', protect, admin, createProduct)`. This means: "Check if logged in (`protect`), THEN check if admin (`admin`), THEN create the product."

## 5. The Security Guards: Middleware (`server/middleware`)

Middleware functions run *in the middle* of a request, before the final controller.

-   **Auth Middleware (`authMiddleware.js`)**:
    -   `protect`: Looks for the JWT token in the request headers. If found, it validates it and attaches the user's info to the request (`req.user`). If not, it throws an error.
    -   `admin`: Checks if `req.user.isAdmin` is true. If not, it blocks access.
-   **Upload Middleware (`uploadRoutes.js`)**: Uses a library called `multer`. It intercepts file uploads, checks if they are images, gives them a unique name (using the current timestamp), and saves them to the `server/uploads` folder.

## Summary of the Flow

1.  **Request**: Frontend sends a request (e.g., "Add Product").
2.  **Server**: `index.js` receives it and sends it to `productRoutes.js`.
3.  **Security**: `productRoutes` runs `authMiddleware` to confirm you are an Admin.
4.  **Upload**: If there's an image, `uploadRoutes` (via Multer) saves the file.
5.  **Logic**: `productController` receives the data, creates a new Product model.
6.  **Database**: Mongoose saves the model to MongoDB.
7.  **Response**: The server sends back a "Success" message to the frontend.
