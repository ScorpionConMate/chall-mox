const puppeteer = require('puppeteer');

class ScrapperCore {
    /** @type {puppeteer} */
    _puppeteer;

    /** @type {string} */
    _url;

    constructor(url) {
        this._puppeteer = puppeteer;
        this._url = url;
    }

    async getPage() {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const urlToScrap = new URL(this._url);
            await page.goto(urlToScrap.href, {
                waitUntil: 'domcontentloaded'
            });
            await page.setViewport({ width: 1920, height: 1080 });

            return page;
        } catch (error) {
            console.error("Error getting page: ", this._url, error);
            throw error;
        }
    }
}

module.exports = { ScrapperCore };


