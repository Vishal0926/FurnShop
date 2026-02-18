# Free Deployment Guide for MERN Stack

This guide walks you through deploying your MERN stack application for free using **MongoDB Atlas** (Database), **Render** (Backend), and **Vercel** (Frontend).

## Prerequisites

- [ ] GitHub account
- [ ] Code pushed to a GitHub repository (separately or monorepo)
- [ ] MongoDB Atlas account

---

## Part 1: Database (MongoDB Atlas)

1.  **Log in** to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  **Create a Cluster**:
    -   **Note**: You can only have **one free cluster per project**. If you already have a free cluster in your current project, you must create a **New Project** first.
    -   Select the **M0 Sandbox** (Shared) tier. **This is the only free option.** 
    -   (You may need to click a **Shared** tab or look for the "Free" label).
    -   Do **not** select M10, M30, or Flex, as these are paid.
3.  **Create a Database User**:
    -   Go to **Database Access** > **Add New Database User**.
    -   Enter a username and password (remember these!).
4.  **Allow Network Access**:
    -   Go to **Network Access** > **Add IP Address**.
    -   Select **Allow Access from Anywhere** (`0.0.0.0/0`).
5.  **Get Connection String**:
    -   Click **Connect**.
    -   Select **Drivers** (usually under "Connect your application"). **This is the one your app needs.**
    -   (Compass is just for viewing data manually, you don't *need* it for the app to work).
    -   Copy the connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/...`).
    -   Replace `<password>` with your actual password.

---

## Part 2: Backend Deployment (Render)

1.  **Sign up/Log in** to [Render](https://render.com/).
2.  Click **New +** and select **Web Service**.
3.  **Connect your GitHub repository**.
4.  **Configure the Service**:
    -   **Name**: `furniture-shop-api` (or similar)
    -   **Root Directory**: `server` (Important! usage of subdirectory)
    -   **Runtime**: Node
    -   **Build Command**: `npm install`
    -   **Start Command**: `node index.js`
    -   **Instance Type**: Free
5.  **Environment Variables**:
    -   Click **Advanced** or **Environment Variables**.
    -   Add `MONGODB_URI`: Paste your MongoDB connection string.
    -   Add `PORT`: `5000` (or whatever Render assigns, usually automatic).
    -   Add `JWT_SECRET`: `your_secret_key` (same as local .env).
6.  **Deploy Web Service**.
7.  **Copy the Backend URL**: Once deployed, copy the URL (e.g., `https://furniture-shop-api.onrender.com`).

---

## Part 3: Frontend Deployment (Vercel)

1.  **Sign up/Log in** to [Vercel](https://vercel.com/).
2.  Click **Add New...** > **Project**.
3.  **Import your GitHub repository**.
4.  **Configure Project**:
    -   **Framework Preset**: Vite
    -   **Root Directory**: Click Edit and select `client`.
5.  **Environment Variables**:
    -   Expand **Environment Variables**.
    -   Key: `VITE_API_URL`
    -   Value: `https://furniture-shop-api.onrender.com/api` (Your Render Backend URL + `/api`)
    -   Key: `VITE_BASE_URL`
    -   Value: `https://furniture-shop-api.onrender.com` (Your Render Backend URL)
6.  **Deploy**.
7.  **Visit your site**: Vercel will provide a URL (e.g., `https://furniture-shop.vercel.app`).

---

## Troubleshooting

-   **CORS Issues**: If the frontend cannot talk to the backend, ensure your backend `index.js` allows requests from your Vercel domain.
    -   In `server/index.js`, update `cors` configuration or use `app.use(cors())` to allow all origins (simplest for now).
-   **Images**: Uploaded images are stored in the `uploads` folder on the backend server.
    -   **Note**: On free tier hosting like Render, the filesystem is **ephemeral**. This means uploaded images will disappear when the server restarts. For production, you should use cloud storage like **Cloudinary** or **AWS S3** for images.
