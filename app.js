const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();

dotenv.config(); // called dotenv

// Middleware Array
const middleware = [morgan("dev"), express.static("public"), express.urlencoded({ extended: true }), express.json()];
console.clear();
app.use(middleware);

/* Configuration */
const config = {
	PORT: process.env.PORT || 1000,
};
const nagad = require("./nagad");
app.get("/*", async (req, res, next) => {
	try {
		const nagadURL = await nagad.createPayment({
			// -> get intellisense here
			amount: "100",
			ip: "10.10.0.10",
			orderId: `${Date.now()}`,
			productDetails: { a: "1", b: "2" },
			clientType: "PC_WEB",
		});
		//redirect user to the nagad url

		res.redirect(nagadURL);
	} catch (err) {
		console.log(err);
	}
});

app.listen(config.PORT, () => {
	console.log(`Server is Running on ${config.PORT}`);
});
