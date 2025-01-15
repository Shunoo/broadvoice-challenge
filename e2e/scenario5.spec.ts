import { test, expect } from '@playwright/test';
import { Homepage } from '../page-object/homepage/Homepage';

test('Activate darkmode', async ({ page }) => {
    let homepage = new Homepage(page);
    await homepage.goToPage();
    await homepage.activateDarkMode();
});
