import { test, expect } from '@playwright/experimental-ct-react';
import { Card } from './Card';

test.describe('Card Component', () => {
  test.describe('Rendering', () => {
    test('should render card with children', async ({ mount }) => {
      const component = await mount(
        <Card>
          <p>Card content</p>
        </Card>
      );
      await expect(component.getByText('Card content')).toBeVisible();
    });

    test('should render with title when provided', async ({ mount }) => {
      const component = await mount(
        <Card title="Card Title">
          <p>Content</p>
        </Card>
      );
      await expect(component.getByText('Card Title')).toBeVisible();
      await expect(component.getByRole('heading', { level: 3 })).toBeVisible();
    });

    test('should render with subtitle when provided', async ({ mount }) => {
      const component = await mount(
        <Card title="Title" subtitle="This is a subtitle">
          <p>Content</p>
        </Card>
      );
      await expect(component.getByText('This is a subtitle')).toBeVisible();
    });

    test('should render header actions when provided', async ({ mount }) => {
      const ActionButton = () => <button>Action</button>;

      const component = await mount(
        <Card title="Title" headerActions={<ActionButton />}>
          <p>Content</p>
        </Card>
      );
      await expect(component.getByRole('button', { name: 'Action' })).toBeVisible();
    });
  });

  test.describe('Variants', () => {
    test('should apply elevated variant classes by default', async ({ mount }) => {
      const component = await mount(
        <Card data-testid="card">
          <p>Content</p>
        </Card>
      );
      const card = component.getByTestId('card');
      await expect(card).toHaveClass(/bg-card/);
      await expect(card).toHaveClass(/shadow-md/);
    });

    test('should apply outlined variant classes', async ({ mount }) => {
      const component = await mount(
        <Card variant="outlined" data-testid="card">
          <p>Content</p>
        </Card>
      );
      const card = component.getByTestId('card');
      await expect(card).toHaveClass(/bg-card/);
      await expect(card).toHaveClass(/border/);
    });

    test('should apply filled variant classes', async ({ mount }) => {
      const component = await mount(
        <Card variant="filled" data-testid="card">
          <p>Content</p>
        </Card>
      );
      const card = component.getByTestId('card');
      await expect(card).toHaveClass(/bg-muted/);
    });
  });

  test.describe('Click Interactions', () => {
    test('should call onClick when card is clicked', async ({ mount }) => {
      let clickCount = 0;
      const handleClick = () => {
        clickCount++;
      };

      const component = await mount(
        <Card onClick={handleClick}>
          <p>Clickable content</p>
        </Card>
      );
      const card = component.getByRole('button');
      
      await card.click();
      expect(clickCount).toBe(1);
    });

    test('should be focusable when onClick is provided', async ({ mount }) => {
      const handleClick = () => {};

      const component = await mount(
        <Card onClick={handleClick}>
          <p>Focusable content</p>
        </Card>
      );
      const card = component.getByRole('button');
      await expect(card).toHaveAttribute('tabIndex', '0');
    });

    test('should trigger onClick on Enter key press', async ({ mount }) => {
      let clickCount = 0;
      const handleClick = () => {
        clickCount++;
      };

      const component = await mount(
        <Card onClick={handleClick}>
          <p>Keyboard accessible</p>
        </Card>
      );
      const card = component.getByRole('button');
      
      await card.press('Enter');
      expect(clickCount).toBe(1);
    });
  });
});

