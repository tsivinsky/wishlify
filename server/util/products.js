// Require dependencies
const puppeteer = require("puppeteer");

// Function for getting product's data from its url
module.exports.getProductData = async function (url = "") {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const data = await page.evaluate(() => {
    // Selectors
    const titleSelectors = ["span#productTitle"];
    const priceSelectors = ["span#priceblock_ourprice"];
    const imageSelectors = ["div#imgTagWrapperId > img"];

    // Function for getting element from the page
    function getElement(selectors = []) {
      let element;

      for (let selector of selectors) {
        element = document.querySelector(selector);

        if (element) break;
      }

      return element;
    }

    function checkCurrency(element) {
      if (/\$/.test(element)) {
        return "$";
      }

      if (/\€/.test(price)) {
        return "€";
      }

      return "₽";
    }

    // Get product title
    const title = getElement(titleSelectors).innerText.trim();

    // Get product price
    const price = getElement(priceSelectors).innerText.trim();
    const priceCurrency = checkCurrency(price);

    const convertedPrice = price
      .split("")
      .filter((element) => /[0-9]/.test(parseInt(element)) || element === ".")
      .join("");

    // Get product image
    const image = getElement(imageSelectors).getAttribute("src");

    return {
      title,
      price: {
        amount: convertedPrice,
        currency: priceCurrency,
      },
      image,
    };
  });

  // Get shop url
  const shop = url.split("/")[2];

  data.url = url;
  data.shop = shop;

  await browser.close();

  return data;
};
