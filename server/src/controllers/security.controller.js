const securityService = require("../services/security.service");

const login = async (req, res) => {
	try {
		const { body } = req;
		const user = await securityService.authentication(body);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).send({ Error: "X", Message: error.message })
	}
};

const userUpdate = async (req, res) => {
	try {
		const { body } = req;
		const response = await securityService.updateUser(body);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).send({ Error: "X", Message: error.message })
	}
};

const createAccessToken = async (req, res) => {
	try {
		const { body } = req;
		const response = await securityService.createAccessToken(body);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).send({ Error: "X", Message: error.message })
	}
};

const verifyAccessToken = async (req, res) => {
	try {
		const { body } = req;
		const response = await securityService.verifyAccessToken(body);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).send({ Error: "X", Message: error.message })
	}
};

const updatedPassowordUser = async (req, res) => {
	try {
		const { body } = req;
		const response = await securityService.updatedPassowordUser(body);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).send({ Error: "X", Message: error.message })
	}
};

module.exports = {
	login,
	userUpdate,
	createAccessToken,
	verifyAccessToken,
	updatedPassowordUser,
};
