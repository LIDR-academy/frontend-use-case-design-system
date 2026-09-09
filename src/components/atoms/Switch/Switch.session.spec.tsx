import { test, expect } from '@playwright/experimental-ct-react';
import { SessionSwitch } from './Switch.session.fixture';

test('SW-01: click changes value once', async ({ mount }) => {
  const view = await mount(<SessionSwitch />);
  const control = view.getByRole('switch', { name: 'Notificaciones' });
  await control.click();
  await expect(control).toHaveAttribute('aria-checked', 'true');
  await expect(view.getByTestId('calls')).toHaveText('1');
});
test('SW-03: Space and Enter change value once each', async ({ mount }) => {
  const view = await mount(<SessionSwitch />);
  const control = view.getByRole('switch', { name: 'Notificaciones' });
  await control.focus();
  await control.press('Space');
  await expect(control).toHaveAttribute('aria-checked', 'true');
  await expect(view.getByTestId('calls')).toHaveText('1');
  await control.press('Enter');
  await expect(control).toHaveAttribute('aria-checked', 'false');
  await expect(view.getByTestId('calls')).toHaveText('2');
});
test('SW-02: disabled blocks mouse and callback', async ({ mount }) => {
  const view = await mount(<SessionSwitch disabled />);
  const control = view.getByRole('switch', { name: 'Notificaciones' });
  await expect(control).toBeDisabled();
  await control.click({ force: true });
  await expect(control).toHaveAttribute('aria-checked', 'false');
  await expect(view.getByTestId('calls')).toHaveText('0');
});
test('SW-02: disabled is skipped by Tab and remains unchanged', async ({ mount, page }) => {
  const view = await mount(<SessionSwitch disabled />);
  await view.getByRole('button', { name: 'Antes', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(view.getByRole('button', { name: 'Después', exact: true })).toBeFocused();
  await page.keyboard.press('Space');
  await page.keyboard.press('Enter');
  await expect(view.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  await expect(view.getByTestId('calls')).toHaveText('0');
});
