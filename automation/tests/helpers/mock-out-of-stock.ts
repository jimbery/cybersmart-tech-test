import { Page } from '@playwright/test';
import { Product } from '../../util/import-products';

export async function mockOutOfStock(page: Page, products: Product[]): Promise<Product[]> {
  const mockedProducts = [...products];

  await page.route('**/public/products.json', async (route) => {
    mockedProducts[0] = { ...mockedProducts[0], stock: 0 };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockedProducts),
    });
  });

  return mockedProducts;
}
