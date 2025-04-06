const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth/authRoutes');
const googleAuthRoutes = require('./routes/auth/googleauth'); // Google Auth Routes
const adminProductRouter = require("./routes/Admin/productsroutes");
const shopProductsRouter = require("./routes/shop/shopproductRoute");
const shopCartRouter = require("./routes/shop/cart-routes");
const addressRouter = require("./routes/shop/Adresss-rote");
require('./config/passport'); // Passport configuration

const app = express();
const port = process.env.PORT;

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('❌ MongoDB connection error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true
}));
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Debugging middleware to check incoming requests
app.use((req, res, next) => {
    console.log(`📢 Incoming Request: ${req.method} ${req.url}`);
    console.log(`📩 Body:`, req.body);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', googleAuthRoutes); // Add Google Auth routes
app.use('/api/admin/products', adminProductRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", addressRouter);

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});