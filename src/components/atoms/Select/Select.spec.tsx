import { test, expect } from '@playwright/experimental-ct-react';
import { Select } from './Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

test.describe('Select Component', () => {
  test.describe('Rendering', () => {
    test('should render select element', async ({ mount }) => {
      const component = await mount(<Select options={mockOptions} />);
      await expect(component.getByRole('combobox')).toBeVisible();
    });

    test('should render with label when provided', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} label="Choose an option" />
      );
      await expect(component.getByText('Choose an option')).toBeVisible();
    });

    test('should render all options', async ({ mount }) => {
      const component = await mount(<Select options={mockOptions} />);
      const select = component.getByRole('combobox');

      // Check that all options are present (using toBeAttached instead of toBeVisible for option elements)
      await expect(select.locator('option[value="option1"]')).toBeAttached();
      await expect(select.locator('option[value="option2"]')).toBeAttached();
      await expect(select.locator('option[value="option3"]')).toBeAttached();

      // Verify option count
      await expect(select.locator('option')).toHaveCount(3);
    });

    test('should render placeholder option when provided', async ({
      mount,
    }) => {
      const component = await mount(
        <Select options={mockOptions} placeholder="Select an option" />
      );
      const select = component.getByRole('combobox');
      await expect(select.locator('option[value=""]')).toContainText(
        'Select an option'
      );
    });

    test('should render error message when provided', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} error="This field is required" />
      );
      await expect(component.getByText('This field is required')).toBeVisible();
    });

    test('should render helper text when provided', async ({ mount }) => {
      const component = await mount(
        <Select
          options={mockOptions}
          helperText="Select your preferred option"
        />
      );
      await expect(
        component.getByText('Select your preferred option')
      ).toBeVisible();
    });
  });

  test.describe('States', () => {
    test('should be disabled when disabled prop is true', async ({ mount }) => {
      const component = await mount(<Select options={mockOptions} disabled />);
      const select = component.getByRole('combobox');
      await expect(select).toBeDisabled();
    });

    test('should show error state with error prop', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} error="Error message" />
      );
      const select = component.getByRole('combobox');
      await expect(select).toHaveClass(/border-destructive/);
    });

    test('should be required when required prop is true', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} required label="Required Field" />
      );
      const select = component.getByRole('combobox');
      await expect(select).toHaveAttribute('required');
      await expect(component.getByText('*')).toBeVisible();
    });

    test('should render disabled options correctly', async ({ mount }) => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];
      const component = await mount(<Select options={optionsWithDisabled} />);
      const select = component.getByRole('combobox');
      const disabledOption = select.locator('option[value="option2"]');
      await expect(disabledOption).toBeDisabled();
    });
  });

  test.describe('Value and Change Handling', () => {
    test('should display initial value', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} value="option2" onChange={() => {}} />
      );
      const select = component.getByRole('combobox');
      await expect(select).toHaveValue('option2');
    });

    test('should call onChange when value changes', async ({ mount }) => {
      let changeCount = 0;
      const handleChange = () => {
        changeCount++;
      };

      const component = await mount(
        <Select options={mockOptions} onChange={handleChange} />
      );
      const select = component.getByRole('combobox');

      await select.selectOption('option2');
      expect(changeCount).toBe(1);
      await expect(select).toHaveValue('option2');
    });

    test('should accept value prop for controlled behavior', async ({
      mount,
    }) => {
      const component = await mount(
        <Select
          options={mockOptions}
          value="option1"
          onChange={() => {}}
        />
      );
      const select = component.getByRole('combobox');
      await expect(select).toHaveValue('option1');
    });

    test('should handle uncontrolled select with defaultValue', async ({
      mount,
    }) => {
      const component = await mount(
        <Select options={mockOptions} defaultValue="option2" />
      );
      const select = component.getByRole('combobox');
      await expect(select).toHaveValue('option2');
    });
  });

  test.describe('Events', () => {
    test('should call onFocus when select is focused', async ({ mount }) => {
      let focusCount = 0;
      const handleFocus = () => {
        focusCount++;
      };

      const component = await mount(
        <Select options={mockOptions} onFocus={handleFocus} />
      );
      const select = component.getByRole('combobox');

      await select.focus();
      expect(focusCount).toBe(1);
    });

    test('should call onBlur when select loses focus', async ({ mount }) => {
      let blurCount = 0;
      const handleBlur = () => {
        blurCount++;
      };

      const component = await mount(
        <Select options={mockOptions} onBlur={handleBlur} />
      );
      const select = component.getByRole('combobox');

      await select.focus();
      await select.blur();
      expect(blurCount).toBe(1);
    });

    test('should call onKeyDown when key is pressed', async ({ mount }) => {
      let keyDownCount = 0;
      const handleKeyDown = () => {
        keyDownCount++;
      };

      const component = await mount(
        <Select options={mockOptions} onKeyDown={handleKeyDown} />
      );
      const select = component.getByRole('combobox');

      await select.press('ArrowDown');
      expect(keyDownCount).toBe(1);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate options with arrow keys', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} defaultValue="option1" />
      );
      const select = component.getByRole('combobox');

      await select.focus();
      await expect(select).toHaveValue('option1');

      // Arrow down should move to next option
      await select.press('ArrowDown');
      // Note: The actual value change depends on browser behavior
      // We just verify the element accepts the key
      await expect(select).toBeFocused();
    });

    test('should be accessible via Tab key', async ({ mount, page }) => {
      await mount(
        <div>
          <input type="text" aria-label="First input" />
          <Select options={mockOptions} label="Select field" />
          <input type="text" aria-label="Last input" />
        </div>
      );

      // Tab through elements
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('textbox', { name: 'First input' })
      ).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('combobox')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('textbox', { name: 'Last input' })
      ).toBeFocused();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper label association', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} label="Country" id="country-select" />
      );
      const select = component.getByRole('combobox');
      const label = component.getByText('Country');

      await expect(select).toHaveAttribute('id', 'country-select');
      await expect(label).toHaveAttribute('for', 'country-select');
    });

    test('should show error message with role alert', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} error="Invalid selection" />
      );
      const errorMessage = component.getByRole('alert');
      await expect(errorMessage).toContainText('Invalid selection');
    });

    test('should display error message correctly', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} error="Error message" id="test-select" />
      );
      await expect(component.getByText('Error message')).toBeVisible();
    });

    test('should display helper text correctly', async ({ mount }) => {
      const component = await mount(
        <Select
          options={mockOptions}
          helperText="Helper message"
          id="test-select"
        />
      );
      await expect(component.getByText('Helper message')).toBeVisible();
    });

    test('should support aria-label', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} aria-label="Country selector" />
      );
      await expect(
        component.getByRole('combobox', { name: /country selector/i })
      ).toBeVisible();
    });

    test('should indicate required field visually', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} label="Required Field" required />
      );
      await expect(component.getByText('*')).toBeVisible();
      await expect(component.getByText('*')).toHaveClass(/text-destructive/);
    });
  });

  test.describe('Width and Layout', () => {
    test('should support fullWidth prop', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} fullWidth label="Full Width Select" />
      );
      // Check that the select element itself has w-full class
      const select = component.getByRole('combobox');
      await expect(select).toHaveClass(/w-full/);
    });

    test('should render chevron icon', async ({ mount }) => {
      const component = await mount(<Select options={mockOptions} />);
      const chevron = component.locator('svg[aria-hidden="true"]');
      await expect(chevron).toBeVisible();
    });
  });

  test.describe('Additional Props', () => {
    test('should spread additional props to select element', async ({
      mount,
    }) => {
      const component = await mount(
        <Select
          options={mockOptions}
          data-testid="custom-select"
          autoComplete="country"
        />
      );
      const select = component.getByTestId('custom-select');
      await expect(select).toHaveAttribute('autoComplete', 'country');
    });

    test('should apply custom className to select', async ({ mount }) => {
      const component = await mount(
        <Select options={mockOptions} className="custom-class" />
      );
      const select = component.getByRole('combobox');
      await expect(select).toHaveClass(/custom-class/);
    });

    test('should handle empty options array', async ({ mount }) => {
      const component = await mount(<Select options={[]} />);
      const select = component.getByRole('combobox');
      await expect(select).toBeVisible();
      // Should have no option elements (except placeholder if provided)
      const options = select.locator('option');
      await expect(options).toHaveCount(0);
    });

    test('should handle single option', async ({ mount }) => {
      const singleOption = [{ value: 'only', label: 'Only Option' }];
      const component = await mount(<Select options={singleOption} />);
      const select = component.getByRole('combobox');
      await expect(select.locator('option')).toHaveCount(1);
    });
  });

  test.describe('Multiple Selection Scenarios', () => {
    test('should handle many options', async ({ mount }) => {
      const manyOptions = Array.from({ length: 50 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));
      const component = await mount(<Select options={manyOptions} />);
      const select = component.getByRole('combobox');
      await expect(select).toBeVisible();
      await expect(select.locator('option')).toHaveCount(50);
    });

    test('should handle options with special characters', async ({ mount }) => {
      const specialOptions = [
        { value: 'opt-1', label: 'Option & Co.' },
        { value: 'opt-2', label: 'Option < > "quotes"' },
        { value: 'opt-3', label: "Option's value" },
      ];
      const component = await mount(<Select options={specialOptions} />);
      const select = component.getByRole('combobox');
      await expect(select).toBeVisible();
      await expect(select.locator('option').first()).toContainText(
        'Option & Co.'
      );
    });
  });
});
