import { Page, Locator } from '@playwright/test';
import { toCents } from '../utils/money';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  private item(productName: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ hasText: productName });
  }

  /** Adds a product and returns its price in cents as displayed on the list page. */
  async addToCart(productName: string): Promise<number> {
    const item = this.item(productName);
    const priceText = await item.getByTestId('inventory-item-price').innerText();
    await item.getByRole('button', { name: 'Add to cart' }).click();
    return toCents(priceText);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
