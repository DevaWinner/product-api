require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
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
