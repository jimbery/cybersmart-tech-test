import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly checkoutPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('title');
    this.checkoutPageButton = page.getByTestId('nav-checkout');
  }

  async getTitleText(): Promise<string> {
    return this.page.title();
  }

  // Nav buttons
  async clickCheckoutPageButton(): Promise<void> {
    await this.checkoutPageButton.click();
  }

  // Product card
  getProductCardById(id: string): Locator {
    return this.page.getByTestId(`product-${id}`);
  }

  async getProductNameById(id: string): Promise<string> {
    const card = this.getProductCardById(id);
    const nameLocator = card.locator('.title');
    const name = await nameLocator.textContent();

    return name?.trim() || '';
  }

  async changeProductQtyById(id: string, qty: number): Promise<void> {
    const card = this.getProductCardById(id);
    const qtyInput = card.getByTestId(`qty-${id}`);
    await qtyInput.fill(`${qty}`);
  }

  async addProductToCartById(id: string): Promise<void> {
    const card = this.getProductCardById(id);
    const addToBasketBtn = card.getByTestId(`add-${id}`);
    await addToBasketBtn.click();
  }

  async getAddToBasketBtnTextById(id: string): Promise<string> {
    const card = this.getProductCardById(id);
    const addToBasketBtn = card.getByTestId(`add-${id}`);
    return addToBasketBtn.innerText();
  }

  // Basket
  getBasketItemById(id: string): Locator {
    return this.page.getByTestId(`cart-row-${id}`);
  }

  async getBasketItemQtyById(id: string): Promise<number> {
    const basketItem = this.getBasketItemById(id);
    const qtyString = await basketItem.getByTestId(`cart-qty-${id}`).inputValue();
    return parseInt(qtyString, 10);
  }
}
