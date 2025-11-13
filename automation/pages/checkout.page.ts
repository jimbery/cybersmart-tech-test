import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('#summary-items');
  }

  async getTitleText(): Promise<string> {
    return this.page.title();
  }

  // Cart
  async getCartItems(): Promise<string> {
    return this.cartItems.innerText();
  }
}
