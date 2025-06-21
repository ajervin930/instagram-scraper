const puppeteer = require('puppeteer')
const fs = require("node:fs");
const path = require('path');

async function createCookies() {

}

async function main() {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		slowMo: 300,
	})
	const page = await browser.newPage();

	await page.goto('https://www.tiktok.com/live',
		{
			waitUntil: ['domcontentloaded', 'networkidle2']
		}
	)
	// Access chrome devtools
	const client = await page.createCDPSession()
	const {cookies} = await client.send("Network.getAllCookies");
	// Write cookies to JSON file
	const filePath = path.join(__dirname, 'cookies.json');
	const cookiesJSON = JSON.stringify(cookies);
	fs.writeFileSync(filePath, cookiesJSON);
	await browser.close()

}

main()