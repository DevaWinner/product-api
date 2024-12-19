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
				url: "http://localhost:3000/",
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
		},
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
