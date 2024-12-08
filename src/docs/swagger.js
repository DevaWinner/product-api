const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Product Management API",
			version: "1.0.0",
			description:
				"API Documentation for my e-commerce product management system",
		},
		servers: [
			{
				url: "https://product-api-d8ak.onrender.com/",
			},
		],
	},
	apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
