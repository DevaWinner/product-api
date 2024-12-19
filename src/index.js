require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");
const passport = require("passport");
const session = require("express-session");
require("./config/passportConfig");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Auth Routes
app.use("/auth", authRoutes);

// Product Routes
app.use("/products", productRoutes);

// API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handler
app.use(errorHandler);

connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("Failed to connect to DB", err);
		process.exit(1);
	});
