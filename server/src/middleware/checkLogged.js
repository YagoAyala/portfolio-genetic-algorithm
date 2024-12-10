const admin = require("firebase-admin");

const checkLogged = (req, res, next) => {
	const url = req.url;
	const authorization = req.headers["authorization"];

	if (req?.body?.d) {
		let decoder = new Buffer.from(req.body.e, "base64").toString("ascii");
		decoder = JSON.parse(decoder);

		req.body = {
			...req.body,
			...decoder,
			uuid: "a12aad27-2108-4f36-af28-7122b442ef15",
		};
	}

	if (url.includes("/security/login") ||
		url.includes("/payment/checkout") ||
		url.includes("/payment/checkout_webhook") ||
		url.includes("/security/create_access_token") ||
		url.includes("/security/verify_access_token") ||
		url.includes("/security/password_update") ||
		url.includes("/app") ||
		url.includes("/termos-de-uso") ||
		url.includes("/politica-de-privacidade")
	) {
		next();
		return;
	}

	if (!url.includes("/contests") &&
		!url.includes("/files") &&
		!url.includes("/security") &&
		!url.includes("/payment")
	) {
		next();
		return;
	}

	if (!authorization) {
		return res.json({ not_authorized: true, reload: true });
	}

	admin.auth().verifyIdToken(authorization).then((user) => {
		if (user.aud === "tkp-studios") {
			next();
		}
	}).catch(() => {
		return res.json({ not_authorized: true, reload: true });
	});
};

module.exports = checkLogged;
