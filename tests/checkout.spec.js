const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { ProductsPage } = require('../pages/productPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');

const item1 = { slug: 'sauce-labs-bolt-t-shirt', name: 'Sauce Labs Bolt T-Shirt' };
const item2 = { slug: 'test.allthethings()-t-shirt-(red)', name: 'Test.allTheThings() T-Shirt (Red)' };

test('user can login, add 2 items and complete checkout', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login();
  await expect(page).toHaveURL(/inventory/);

  await products.addItem(item1.slug);
  await products.addItem(item2.slug);
  await expect(products.cartBadge).toHaveText('2');

  await products.openCart();
  await expect(cart.items).toHaveCount(2);
  await expect(cart.itemNames).toHaveText([item1.name, item2.name]);

  await cart.proceedToCheckout();
  await checkout.fillDetails('Test', 'User', '22010');
  await expect(checkout.summaryItems).toHaveCount(2);
  await checkout.finishOrder();

  await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  await expect(products.cartBadge).toHaveCount(0);
});