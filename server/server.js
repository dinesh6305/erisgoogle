const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth/authRoutes');
const adminproductrouter=require("./routes/Admin/productsroutes")
const ShopProductsRouter=require("./routes/shop/shopproductRoute")

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb+srv://relladinesh19:dinesh630@clustereco.lh4sz.mongodb.net/eris"; // Ensure database name is included

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());  // ✅ Removed duplicate JSON parser
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true
}));
app.use(cookieParser());

// Debugging middleware to check incoming requests
app.use((req, res, next) => {
    console.log(`📢 Incoming Request: ${req.method} ${req.url}`);
    console.log(`📩 Body:`, req.body);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/products',adminproductrouter)
app.use('/api/shop/products',ShopProductsRouter)

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
