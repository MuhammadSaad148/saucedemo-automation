import { Page, Locator } from '@playwright/test';
import { toCents } from '../utils/money';

export class CheckoutPage {
  // Step one: customer information
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly error: Locator;

  // Step two: overview
  readonly overviewItemNames: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  // Complete
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.error = page.getByTestId('error');

    this.overviewItemNames = page.getByTestId('inventory-item-name');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');

    this.completeHeader = page.getByTestId('complete-header');
  }

  async fillCustomerInfo(info: { firstName: string; lastName: string; postalCode: string }): Promise<void> {
    await this.firstName.fill(info.firstName);
    await this.lastName.fill(info.lastName);
    await this.postalCode.fill(info.postalCode);
    await this.continueButton.click();
  }

  async readSummaryCents(): Promise<{ subtotal: number; tax: number; total: number }> {
    return {
      subtotal: toCents(await this.subtotalLabel.innerText()),
      tax: toCents(await this.taxLabel.innerText()),
      total: toCents(await this.totalLabel.innerText()),
    };
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
