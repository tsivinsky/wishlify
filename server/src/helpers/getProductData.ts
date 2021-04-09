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

  const titleElement = await getElement("title", selectors);
  const priceElement = await getElement("price", selectors);
  const shippingElement = await getElement("shipping", selectors);
  const imageElement = await getElement("image", selectors);

  if (!titleElement || !priceElement || !shippingElement || !imageElement) {
    throw new Error("Unable to scrape data");
  }

  // Pull the data from elements
  const title = await titleElement.evaluate((title) => title.innerHTML.trim());
  const priceText = await priceElement.evaluate((price) =>
    price.innerHTML.trim()
  );
  const shippingText = await shippingElement.evaluate((shipping) =>
    shipping.innerHTML.trim()
  );
  const image = await imageElement.evaluate((img) => img.getAttribute("src"));

  // Separate price and shipping text into number and currency
  const currency = getCurrency(priceText);
  const price = getAmount(priceText);
  const shipping = getAmount(shippingText);

  const data = {
    title,
    price,
    shipping,
    currency,
    image,
    shop: hostname,
    url,
  };

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

function getCurrency(text: string): string {
  if (/\$/.test(text)) {
    return "$";
  }

  if (/\€/.test(text)) {
    return "€";
  }

  return "₽";
}

function getAmount(text: string): string {
  const amount = text.match(/[0-9]|\.|\,/g).join("");

  return amount;
}
