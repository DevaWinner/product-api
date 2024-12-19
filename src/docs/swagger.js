const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Product Management API",
			version: "1.0.0",
			description:
				"API Documentation for my e-commerce product management system with GitHub OAuth authentication",
		},
		servers: [
			{
				url: "https://product-api-d8ak.onrender.com/",
			},
		],
		components: {
			securitySchemes: {
				githubAuth: {
					type: "oauth2",
					flows: {
						authorizationCode: {
							authorizationUrl: "https://github.com/login/oauth/authorize",
							tokenUrl: "https://github.com/login/oauth/access_token",
							scopes: {
								"read:user": "Read user information",
							},
						},
					},
				},
			},
			schemas: {
				Product: {
					type: "object",
					required: ["name", "description", "price", "category", "inStock"],
					properties: {
						name: {
							type: "string",
						},
						description: {
							type: "string",
						},
						price: {
							type: "number",
						},
						category: {
							type: "string",
						},
						inStock: {
							type: "boolean",
						},
						createdAt: {
							type: "string",
							format: "date-time",
						},
						updatedAt: {
							type: "string",
							format: "date-time",
						},
					},
				},
				User: {
					type: "object",
					properties: {
						id: {
							type: "string",
							description: "User ID",
						},
						username: {
							type: "string",
							description: "Username",
						},
						email: {
							type: "string",
							format: "email",
							description: "User email",
						},
					},
				},
				Order: {
					type: "object",
					required: ["userId", "products", "totalAmount"],
					properties: {
						userId: {
							type: "string",
							description: "User ID",
						},
						products: {
							type: "array",
							items: {
								type: "object",
								required: ["productId", "quantity", "price"],
								properties: {
									productId: {
										type: "string",
										description: "Product ID",
									},
									quantity: {
										type: "number",
										description: "Quantity ordered",
									},
									price: {
										type: "number",
										description: "Price of the product",
									},
								},
							},
						},
						totalAmount: {
							type: "number",
							description: "Total amount of the order",
						},
						status: {
							type: "string",
							description: "Order status",
							enum: ["pending", "shipped", "delivered"],
							default: "pending",
						},
						createdAt: {
							type: "string",
							format: "date-time",
						},
						updatedAt: {
							type: "string",
							format: "date-time",
						},
					},
				},
			},
		},
		tags: [
			{
				name: "Product",
				description: "API endpoints related to products",
			},
			{
				name: "Order",
				description: "API endpoints related to orders",
			},
		],
		security: [
			{
				githubAuth: [],
			},
		],
	},
	apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
