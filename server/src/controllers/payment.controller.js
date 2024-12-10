const paymentService = require("../services/payment.service");

const checkout = async (req, res) => {
	try {
		const data = req.body;
		const result = await paymentService.checkout(data);
		res.status(200).json(result)
	} catch (error) {
		res.status(500).send({ Error: "X", Message: error.message })
	}
};

const checkoutWebhook = async (req, res) => {
	try {
		const body = req.body;
		const uid = req.query?.uid;
		const result = await paymentService.checkoutWebhook(uid, body);
		res.status(200).json(result)
	} catch (error) {
		res.status(500).send({ Error: "X", Message: error.message })
	}
};

module.exports = {
	checkout,
	checkoutWebhook,
};
