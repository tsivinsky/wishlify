// Dependencies
import puppeteer, { Browser, Page, ElementHandle } from "puppeteer";
import { URL } from "url";
import allSelectors from "../selectors.json";

interface Selector {
  title: string[];
  price: string[];
  shipping: string[];
  image: string[];
}

export async function getProductData(url: string) {
  const browser: Browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page: Page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const hostname: string = new URL(url).hostname;

  const selectors: Selector = allSelectors
    .map((shop) => (hostname.includes(shop.name) ? shop.selectors : null))
    .filter((x) => x)[0];

  const title = await getElement("title", selectors);
  const price = await getElement("price", selectors);
  const image = await getElement("image", selectors);
  const shipping = await getElement("shipping", selectors);

  if (!title || !price || !image) {
    throw new Error("Unable to scrape data");
  }

  // Pull the data from elements
  const titleText = await title.evaluate((title) => title.innerHTML.trim());
  const priceText = await price.evaluate((price) => price.innerHTML.trim());
  const shippingText = await shipping.evaluate((shipping) =>
    shipping.innerHTML.trim()
  );
  const imageSrc = await image.evaluate((img) => img.getAttribute("src"));

  // Separate price and shipping text into number and currency
  const priceData = separateCurrencyAndPrice(priceText);
  const shippingData = separateCurrencyAndPrice(shippingText);

  const data = {
    title: titleText,
    price: priceData,
    shipping: shippingData,
    image: imageSrc,
    shop: hostname,
    url,
  };

  // Close browser
  await browser.close();

  return data;

  async function getElement(
    name: string,
    selectors: Selector
  ): Promise<ElementHandle> {
    return new Promise(async (resolve) => {
      let element: ElementHandle;

      for (const selector of selectors[name]) {
        if (element) {
          break;
        }

        element = await page.$(selector);
      }

      resolve(element);
    });
  }
}

function separateCurrencyAndPrice(text: string) {
  const amount = text.match(/[0-9]|\.|\,/g).join("");

  if (/\$/.test(text)) {
    return {
      amount,
      currency: "$",
    };
  }

  if (/\€/.test(text)) {
    return {
      amount,
      currency: "€",
    };
  }

  return {
    amount,
    currency: "₽",
  };
}

// // Function for scraping url to get product's data
// module.exports = async function getProductData(url = "") {
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ["no-sandbox"],
//   });
//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: "networkidle0" });

//   const shop = new URL(url).hostname;

//   const selectors = allSelectors
//     .map((_shop) => (shop.includes(_shop.name) ? _shop.selectors : null))
//     .filter((x) => x)[0];

//   const title = await getElement(selectors.title);
//   const price = await getElement(selectors.price);
//   const image = await getElement(selectors.image);
//   const shipping = await getElement(selectors.shipping);

//   if (!title || !price || !image) {
//     throw new Error("Unable to scrape data");
//   }

//   // Pull the data from elements
//   const titleText = await title.evaluate((title) => title.innerText.trim());
//   const priceText = await price.evaluate((price) => price.innerText.trim());
//   const shippingText = await shipping.evaluate((shipping) =>
//     shipping.innerText.trim()
//   );
//   const imageSrc = await image.evaluate((img) => img.getAttribute("src"));

//   // Separate price and shipping text into number and currency
//   const priceData = separateCurrencyAndPrice(priceText);
//   const shippingData = separateCurrencyAndPrice(shippingText);

//   const data = {
//     title: titleText,
//     price: priceData,
//     shipping: shippingData,
//     image: imageSrc,
//     shop,
//     url,
//   };

//   // Close browser
//   await browser.close();

//   return data;

//   async function getElement(selectors = []) {
//     return new Promise(async (resolve) => {
//       let element;

//       for (let selector of selectors) {
//         element = await page.$(selector);

//         if (element) break;
//       }

//       resolve(element);
//     });
//   }
// };

// function separateCurrencyAndPrice(text = "") {
//   const amount = text.match(/[0-9]|\.|\,/g).join("");

//   if (/\$/.test(text)) {
//     return {
//       amount,
//       currency: "$",
//     };
//   }

//   if (/\€/.test(text)) {
//     return {
//       amount,
//       currency: "€",
//     };
//   }

//   return {
//     amount,
//     currency: "₽",
//   };
// }
