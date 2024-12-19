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
 *     security:
 *       - githubAuth: []
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: A list of products
 *       401:
 *         description: Unauthorized access
 */

router.get("/", isAuthenticated, getAllProducts);
router.post("/", isAuthenticated, validateProduct, createProduct);
router.get("/:id", isAuthenticated, getProductById);
router.put("/:id", isAuthenticated, validateProduct, updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);

module.exports = router;
