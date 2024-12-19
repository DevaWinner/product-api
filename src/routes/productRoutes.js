const express = require("express");
const {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");
const { validateProduct } = require("../validators/productValidator");
const router = express.Router();

/**
 * Middleware to check if the user is authenticated
 */
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({ error: "Unauthorized access" });
}

/**
 * @swagger
 * securitySchemes:
 *   githubAuth:
 *     type: oauth2
 *     flows:
 *       authorizationCode:
 *         authorizationUrl: https://github.com/login/oauth/authorize
 *         tokenUrl: https://github.com/login/oauth/access_token
 *         scopes:
 *           read:user: Read user information
 *
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Product
 *     security:
 *       - githubAuth: []
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: A list of products
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Product
 *     security:
 *       - githubAuth: []
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     security:
 *       - githubAuth: []
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Product
 *     security:
 *       - githubAuth: []
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     security:
 *       - githubAuth: []
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Product not found
 */

router.get("/", isAuthenticated, getAllProducts);
router.post("/", isAuthenticated, validateProduct, createProduct);
router.get("/:id", isAuthenticated, getProductById);
router.put("/:id", isAuthenticated, validateProduct, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

module.exports = router;
