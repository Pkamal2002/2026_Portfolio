# Portfolio Frontend (Client)

This is the React frontend for the modern, Antigravity-inspired personal portfolio. It is built using **Vite**, **React**, **Tailwind CSS v4**, and **Framer Motion**.

## 🚀 Technologies Used
* **Framework**: React.js (via Vite)
* **Styling**: Tailwind CSS v4
* **Animations**: Framer Motion
* **Routing**: React Router DOM
* **HTTP Client**: Axios
* **Icons**: Lucide React

## 📦 Setup & Installation
1. Make sure you have Node.js installed.
2. Navigate to this directory: `cd client`
3. Install the dependencies:
   ```bash
   npm install
   ```

## ⚙️ Environment Variables
Create a `.env` file in the `client` directory:
```env
# The base URL pointing to the Express backend API
VITE_API_URL=http://localhost:5000/api
```

## 💻 Running Locally
To start the Vite development server with Hot Module Replacement:
```bash
npm run dev
```

## 🛠 Building for Production
To build the optimized static files:
```bash
npm run build
```
The resulting files will be generated in the `dist` folder. You can deploy this directory to Vercel, AWS S3, or Nginx.

## 🌐 Connecting to the Backend
 The frontend uses `axios` located in `src/utils/axios.js` to communicate with the Express backend. By default, it will fetch `Projects` and submit `Contact` forms dynamically. If the backend fails or is not running, the application will safely fallback to static dummy data for the project showcase.
