export const credentials = {
  username: process.env.SAUCE_USER ?? 'standard_user',
  password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
};

export const customer = {
  firstName: 'Test',
  lastName: 'Customer',
  postalCode: '46000',
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
} as const;

// Sales tax observed on the checkout overview page. If the site changes it, update here only.
export const TAX_RATE_PERCENT = 8;
