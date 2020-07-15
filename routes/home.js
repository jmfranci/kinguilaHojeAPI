const express = require("express");
const router = express.Router();

const puppeteer = require("puppeteer");
log = console.log;

getExchangeRate = (cb) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://www.kinguilahoje.com/");

    const dollar = await page.$eval(
      "#page-top > header > div > div > div.row.margin-top-0px > div > div > div:nth-child(1) > span.col-xs-12.quotation",
      (element) => element.textContent
    );

    const euro = await page.$eval(
      "#page-top > header > div > div > div.row.margin-top-0px > div > div > div:nth-child(2) > span.col-xs-12.quotation",
      (element) => element.textContent
    );

    await page.screenshot({ path: "example.png" });
    await browser.close();

    cb({ EUR: euro, USD: dollar });
  })();
};

router.get("/", (req, res) => {
  getExchangeRate((rates) => {
    res.json.send(rates);
  });
});

module.exports = router;
