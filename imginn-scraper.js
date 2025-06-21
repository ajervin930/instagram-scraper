const {connect} = require("puppeteer-real-browser");
const path = require("path");
const fs = require("node:fs");

async function imginnScraper() {
	const {browser, page} = await connect({
		headless: false,

		args: [],

		customConfig: {},

		turnstile: true,

		connectOption: {},

		disableXvfb: false,
		ignoreAllFlags: false,
		// proxy:{
		//     host:'<proxy-host>',
		//     port:'<proxy-port>',
		//     username:'<proxy-username>',
		//     password:'<proxy-password>'
		// }
	});

	await page.goto('https://imginn.com/avajustin/',
		{
			waitUntil: ['domcontentloaded', 'networkidle2']
		}
	)

	// Access chrome devtools
	const client = await page.createCDPSession()
	const {cookies} = await client.send("Network.getAllCookies");
	console.log(cookies)
	// Write cookies to JSON file
	const filePath = path.join(__dirname, 'cookies.json');
	const cookiesJSON = JSON.stringify(cookies);
	fs.writeFileSync(filePath, cookiesJSON);

}

imginnScraper();