import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  readonly title: Locator;
  readonly checkoutPageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('title');
    this.checkoutPageButton = page.getByTestId('nav-checkout')
  }

  async getTitleText(): Promise<string> {
    return this.page.title();
  }

  // nav buttons
  async clickCheckoutPageButton(): Promise<void> {
    await this.checkoutPageButton.click();
  }  

  // product card
  getProductCardById(id: string): Locator {
    return this.page.getByTestId(`product-${id}`);
  }

   async getProductNameById(id: string): Promise<string> {
    const card = this.getProductCardById(id);
    const nameLocator = card.locator('.title');
    
    return (await nameLocator.textContent())?.trim() || ''; // does this mask an error?
  }

  async changeProductQtyById(id: string, qty: number): Promise<void> {
    const card = this.getProductCardById(id);
    const addToBasketBtn = card.getByTestId(`qty-${id}`);

    await addToBasketBtn.fill(`${qty}`)
  }

  async addProductToCartById(id: string): Promise<void> {
    const card = this.getProductCardById(id);
    const addToBasketBtn = card.getByTestId(`add-${id}`);

    await addToBasketBtn.click();
  }

  async getAddToBasketBtnTextById(id: string): Promise<string> {
    const card = this.getProductCardById(id);
    const addToBasketBtn = card.getByTestId(`add-${id}`)

    return await addToBasketBtn.innerText()
  }


  // basket
  getBasketItemById(id: string) {
    return this.page.getByTestId(`cart-row-${id}`)
  }

  async getBasketItemQtyById(id: string) {
    const basketItem = this.getBasketItemById(id)
    const basketItemQtyString = await basketItem.getByTestId(`cart-qty-${id}`).inputValue()


    return parseInt(basketItemQtyString, 10)
  }
}
