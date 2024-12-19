const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { validateOrder } = require("../validators/orderValidator");
const router = express.Router();

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized access" });
}

// Swagger documentation

/**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Order
 *     security:
 *       - githubAuth: []
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: A list of orders
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - Order
 *     security:
 *       - githubAuth: []
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Order
 *     security:
 *       - githubAuth: []
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: A single order
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     tags:
 *       - Order
 *     security:
 *       - githubAuth: []
 *     summary: Update an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags:
 *       - Order
 *     security:
 *       - githubAuth: []
 *     summary: Delete an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       204:
 *         description: Order deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Order not found
 */

// Routes
router.get("/", isAuthenticated, getAllOrders);
router.post("/", isAuthenticated, validateOrder, createOrder);
router.get("/:id", isAuthenticated, getOrderById);
router.put("/:id", isAuthenticated, validateOrder, updateOrder);
router.delete("/:id", isAuthenticated, deleteOrder);

module.exports = router;