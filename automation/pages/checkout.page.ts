import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly basketItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketItems = page.locator('#summary-items');
  }

  async getTitleText(): Promise<string> {
    return this.page.title();
  }

  // Basket
  async getBasketItems(): Promise<string> {
    return this.basketItems.innerText();
  }
}
