import { _electron as electron, test, expect, ElectronApplication, Page } from '@playwright/test';
import { ProductPage } from '../pages/products.page';
import { products } from '../util/import-products';
import { EnGb } from '../lang/en-gb';
import { CheckoutPage } from '../pages/checkout.page';
import { mockOutOfStock } from './helpers/mock-out-of-stock';

test.describe('basket', () => {
  let app: ElectronApplication;
  let page: Page;
  let productPage: ProductPage;

  test.beforeEach(async () => {
    app = await electron.launch({ args: ['.'] });
    page = await app.firstWindow();
    productPage = new ProductPage(page);

    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await app.close();
  });

  test('open home screen', async () => {
    const strings = new EnGb();

    const title = await productPage.getTitleText();
    expect(title).toContain(strings.productPageTitle);
  });

  test('add product to basket by quantity: product page basket', async () => {
    const firstProduct = products[0];
    const expectedQty = 2;

    await productPage.changeProductQtyById(firstProduct.id, expectedQty);
    await productPage.addProductToCartById(firstProduct.id);

    const qty = await productPage.getBasketItemQtyById(firstProduct.id);
    expect(qty).toBe(expectedQty);
  });

  test('add product to basket by quantity: checkout page', async () => {
    const checkoutPage = new CheckoutPage(page);
    const firstProduct = products[0];
    const expectedQty = 2;

    await productPage.changeProductQtyById(firstProduct.id, expectedQty);
    await productPage.addProductToCartById(firstProduct.id);
    await productPage.clickCheckoutPageButton();

    const basketItems = await checkoutPage.getBasketItems();
    expect(basketItems).toContain(`${firstProduct.name} × ${expectedQty}`);
  });

  test('add product to basket by quantity with stock 0', async () => {
    const strings = new EnGb();
    const modifiedArr = await mockOutOfStock(page, products);
    const firstProduct = modifiedArr[0];

    // Reload page to load mocked array
    await page.reload();

    const addToBasketBtnText = await productPage.getAddToBasketBtnTextById(firstProduct.id);
    expect(addToBasketBtnText).toBe(strings.outOfStock);
  });
});
