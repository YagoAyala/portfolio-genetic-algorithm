const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");

router.post("/checkout", paymentController.checkout);
router.post("/checkout_webhook", paymentController.checkoutWebhook);

module.exports = router;
