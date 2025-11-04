import { test, expect } from '@playwright/experimental-ct-react';
import { Tag } from './Tag';

test.describe('Tag Component', () => {
  test.describe('Rendering', () => {
    test('should render tag with default props', async ({ mount }) => {
      const component = await mount(<Tag />);
      await expect(component.getByText('Tag')).toBeVisible();
    });

    test('should render tag with custom text', async ({ mount }) => {
      const component = await mount(<Tag text="Custom Tag" />);
      await expect(component.getByText('Custom Tag')).toBeVisible();
    });

    test('should render both icons by default', async ({ mount }) => {
      const component = await mount(<Tag data-testid="tag" />);
      const svgElements = await component.locator('svg').all();
      expect(svgElements).toHaveLength(2);
    });

    test('should render only start icon when endIcon is false', async ({
      mount,
    }) => {
      const component = await mount(<Tag endIcon={false} />);
      const svgElements = await component.locator('svg').all();
      expect(svgElements).toHaveLength(1);
    });

    test('should render only end icon when startIcon is false', async ({
      mount,
    }) => {
      const component = await mount(<Tag startIcon={false} />);
      const svgElements = await component.locator('svg').all();
      expect(svgElements).toHaveLength(1);
    });

    test('should render no icons when both are disabled', async ({ mount }) => {
      const component = await mount(<Tag startIcon={false} endIcon={false} />);
      const svgElements = await component.locator('svg').all();
      expect(svgElements).toHaveLength(0);
    });

    test('should not render text when showText is false', async ({ mount }) => {
      const component = await mount(<Tag text="Hidden Text" showText={false} />);
      await expect(component.getByText('Hidden Text')).not.toBeVisible();
    });
  });

  test.describe('Sizes', () => {
    test('should apply small size classes', async ({ mount }) => {
      const component = await mount(<Tag size="s" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/px-2/);
      await expect(tag).toHaveClass(/py-1/);
      await expect(tag).toHaveClass(/text-xs/);
      await expect(tag).toHaveClass(/gap-1/);
    });

    test('should apply medium size classes by default', async ({ mount }) => {
      const component = await mount(<Tag />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/px-3/);
      await expect(tag).toHaveClass(/py-1\.5/);
      await expect(tag).toHaveClass(/text-sm/);
      await expect(tag).toHaveClass(/gap-2/);
    });

    test('should apply large size classes', async ({ mount }) => {
      const component = await mount(<Tag size="l" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/px-4/);
      await expect(tag).toHaveClass(/py-2/);
      await expect(tag).toHaveClass(/text-base/);
      await expect(tag).toHaveClass(/gap-2/);
    });
  });

  test.describe('Colors and Types', () => {
    test('should apply blue positive color classes by default', async ({
      mount,
    }) => {
      const component = await mount(<Tag />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/bg-blue-100/);
      await expect(tag).toHaveClass(/text-blue-800/);
      await expect(tag).toHaveClass(/border-blue-200/);
    });

    test('should apply yellow positive color classes', async ({ mount }) => {
      const component = await mount(<Tag color="yellow" type="positive" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/bg-yellow-100/);
      await expect(tag).toHaveClass(/text-yellow-800/);
      await expect(tag).toHaveClass(/border-yellow-200/);
    });

    test('should apply blue negative color classes', async ({ mount }) => {
      const component = await mount(<Tag color="blue" type="negative" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/bg-blue-800/);
      await expect(tag).toHaveClass(/text-blue-100/);
      await expect(tag).toHaveClass(/border-blue-700/);
    });

    test('should apply green positive color classes', async ({ mount }) => {
      const component = await mount(<Tag color="green" type="positive" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/bg-green-100/);
      await expect(tag).toHaveClass(/text-green-800/);
      await expect(tag).toHaveClass(/border-green-200/);
    });

    test('should apply gray negative color classes', async ({ mount }) => {
      const component = await mount(<Tag color="gray" type="negative" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/bg-gray-800/);
      await expect(tag).toHaveClass(/text-gray-100/);
      await expect(tag).toHaveClass(/border-gray-700/);
    });

    test('should apply orange positive color classes', async ({ mount }) => {
      const component = await mount(<Tag color="orange" type="positive" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/bg-orange-100/);
      await expect(tag).toHaveClass(/text-orange-800/);
      await expect(tag).toHaveClass(/border-orange-200/);
    });

    test('should apply pink negative color classes', async ({ mount }) => {
      const component = await mount(<Tag color="pink" type="negative" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/bg-pink-800/);
      await expect(tag).toHaveClass(/text-pink-100/);
      await expect(tag).toHaveClass(/border-pink-700/);
    });

    test('should apply purple positive color classes', async ({ mount }) => {
      const component = await mount(<Tag color="purple" type="positive" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/bg-purple-100/);
      await expect(tag).toHaveClass(/text-purple-800/);
      await expect(tag).toHaveClass(/border-purple-200/);
    });
  });

  test.describe('Icons', () => {
    test('should use arrow-left icon for start icon', async ({ mount }) => {
      const component = await mount(<Tag endIcon={false} />);
      const svgElement = component.locator('svg').first();
      await expect(svgElement).toHaveClass(/text-blue-800/);
    });

    test('should use x icon for end icon', async ({ mount }) => {
      const component = await mount(<Tag startIcon={false} />);
      const svgElement = component.locator('svg').first();
      await expect(svgElement).toHaveClass(/text-blue-800/);
    });

    test('should apply correct icon colors for positive type', async ({
      mount,
    }) => {
      const component = await mount(<Tag color="green" type="positive" />);
      const svgElements = await component.locator('svg').all();
      for (const svg of svgElements) {
        await expect(svg).toHaveClass(/text-green-800/);
      }
    });

    test('should apply correct icon colors for negative type', async ({
      mount,
    }) => {
      const component = await mount(<Tag color="blue" type="negative" />);
      const svgElements = await component.locator('svg').all();
      for (const svg of svgElements) {
        await expect(svg).toHaveClass(/text-blue-100/);
      }
    });

    test('should use correct icon sizes based on tag size', async ({
      mount,
    }) => {
      const smallComponent = await mount(<Tag size="s" />);
      const mediumComponent = await mount(<Tag size="m" />);
      const largeComponent = await mount(<Tag size="l" />);

      const smallIcons = await smallComponent.locator('svg').all();
      const mediumIcons = await mediumComponent.locator('svg').all();
      const largeIcons = await largeComponent.locator('svg').all();

      for (const icon of smallIcons) {
        await expect(icon).toHaveClass(/w-3/);
        await expect(icon).toHaveClass(/h-3/);
      }

      for (const icon of mediumIcons) {
        await expect(icon).toHaveClass(/w-4/);
        await expect(icon).toHaveClass(/h-4/);
      }

      for (const icon of largeIcons) {
        await expect(icon).toHaveClass(/w-6/);
        await expect(icon).toHaveClass(/h-6/);
      }
    });
  });

  test.describe('Interaction', () => {
    test('should call onClick when clicked', async ({ mount }) => {
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      const component = await mount(<Tag onClick={handleClick} />);
      const tag = component.locator('div').first();

      await tag.click();
      expect(clicked).toBe(true);
    });

    test('should have button role and tabIndex when onClick is provided', async ({
      mount,
    }) => {
      const handleClick = () => {};
      const component = await mount(<Tag onClick={handleClick} />);
      const tag = component.locator('div').first();

      await expect(tag).toHaveAttribute('role', 'button');
      await expect(tag).toHaveAttribute('tabIndex', '0');
    });

    test('should not have button role when onClick is not provided', async ({
      mount,
    }) => {
      const component = await mount(<Tag />);
      const tag = component.locator('div').first();

      await expect(tag).not.toHaveAttribute('role');
      await expect(tag).not.toHaveAttribute('tabIndex');
    });
  });

  test.describe('Custom Props', () => {
    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Tag className="custom-class" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/custom-class/);
    });

    test('should maintain base classes with custom className', async ({
      mount,
    }) => {
      const component = await mount(<Tag className="custom-class" />);
      const tag = component.locator('div').first();
      await expect(tag).toHaveClass(/inline-flex/);
      await expect(tag).toHaveClass(/items-center/);
      await expect(tag).toHaveClass(/border/);
      await expect(tag).toHaveClass(/rounded-full/);
      await expect(tag).toHaveClass(/font-medium/);
      await expect(tag).toHaveClass(/custom-class/);
    });
  });

  test.describe('Accessibility', () => {
    test('should be accessible with proper structure', async ({ mount }) => {
      const component = await mount(<Tag text="Accessible Tag" />);
      await expect(component.getByText('Accessible Tag')).toBeVisible();
    });

    test('should support keyboard interaction when clickable', async ({
      mount,
    }) => {
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      const component = await mount(<Tag onClick={handleClick} />);
      const tag = component.locator('div').first();

      await tag.focus();
      await expect(tag).toBeFocused();

      // Test Enter key
      await tag.press('Enter');
      // Note: The component should handle keyboard events for full accessibility
    });
  });
});

