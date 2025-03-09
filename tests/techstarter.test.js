
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://techstarter.de/', { waitUntil: 'domcontentloaded' });
  
  await expect(page).toHaveTitle(/Techstarter/);
});

test('cookie banner and page header check', async ({ page }) => {
  await page.goto('https://techstarter.de/', { waitUntil: 'domcontentloaded' });

  
  const acceptButton = page.locator('button', { hasText: 'Alle akzeptieren' });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  
  await expect(page.locator('#BorlabsDialogBackdrop')).toBeHidden({ timeout: 5000 });

  
  const header = page.locator('h1:has-text("Starte mit uns deine IT-Karriere")');
  await header.scrollIntoViewIfNeeded();
  await expect(header).toBeVisible({ timeout: 10000 });
});
