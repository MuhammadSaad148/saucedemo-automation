class ProductsPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addItem(itemSlug) {
    await this.page.locator(`[data-test="add-to-cart-${itemSlug}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { ProductsPage };