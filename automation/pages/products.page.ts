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

    if (!name) {
      throw new Error(`no product found with id ${id}`)
    }

    return name.trim();
  }

  async changeProductQtyById(id: string, qty: number): Promise<void> {
    const card = this.getProductCardById(id);
    const qtyInput = card.getByTestId(`qty-${id}`);
    await qtyInput.fill(`${qty}`);
  }

  async addProductToCartById(id: string): Promise<void> {
    const card = this.getProductCardById(id);
    const addToCartBtn = card.getByTestId(`add-${id}`);
    await addToCartBtn.click();
  }

  async getAddToCartBtnTextById(id: string): Promise<string> {
    const card = this.getProductCardById(id);
    const addToCartBtn = card.getByTestId(`add-${id}`);
    return addToCartBtn.innerText();
  }

  // Cart
  getCartItemById(id: string): Locator {
    return this.page.getByTestId(`cart-row-${id}`);
  }

  async getCartItemQtyById(id: string): Promise<number> {
    const cartItem = this.getCartItemById(id);
    const qtyString = await cartItem.getByTestId(`cart-qty-${id}`).inputValue();
    return parseInt(qtyString, 10);
  }
}
