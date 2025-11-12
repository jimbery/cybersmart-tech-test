import { _electron as electron, test, expect } from '@playwright/test';

test.describe('Electron app', () => {
  let app: any;
  let page: any;

  test.beforeAll(async () => {
    app = await electron.launch({ args: ['.'] }); // '.' points to the electron main file
    page = await app.firstWindow(); // Get the first renderer window
  });

  test.afterAll(async () => {
    await app.close();
  });

  test('should open home screen', async () => {
    const title = await page.title();
    expect(title).toContain('Shopping (Electron)');
  });

  // test('should navigate to settings', async () => {
  //   await page.click('button#settings');
  //   await expect(page.locator('h1')).toHaveText('Settings');
  // });
});
