import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';
import { Input } from './Input';

test.describe('Input Component', () => {
  test.describe('Rendering', () => {
    test('should render input element', async ({ mount }) => {
      const component = await mount(<Input />);
      await expect(component.getByRole('textbox')).toBeVisible();
    });

    test('should render with label when provided', async ({ mount }) => {
      const component = await mount(<Input label="Email Address" />);
      await expect(component.getByText('Email Address')).toBeVisible();
    });

    test('should render with placeholder', async ({ mount }) => {
      const component = await mount(<Input placeholder="Enter your email" />);
      await expect(component.getByPlaceholder('Enter your email')).toBeVisible();
    });

    test('should render error message when provided', async ({ mount }) => {
      const component = await mount(<Input error="This field is required" />);
      await expect(component.getByText('This field is required')).toBeVisible();
    });

    test('should render helper text when provided', async ({ mount }) => {
      const component = await mount(<Input helperText="Enter a valid email address" />);
      await expect(component.getByText('Enter a valid email address')).toBeVisible();
    });
  });

  test.describe('Input Types', () => {
    test('should render text input by default', async ({ mount }) => {
      const component = await mount(<Input />);
      await expect(component.getByRole('textbox')).toBeVisible();
    });

    test('should render email input', async ({ mount }) => {
      const component = await mount(<Input type="email" />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveAttribute('type', 'email');
    });

    test('should render password input', async ({ mount }) => {
      const component = await mount(<Input type="password" placeholder="Password" />);
      const input = component.getByPlaceholder('Password');
      await expect(input).toHaveAttribute('type', 'password');
    });

    test('should render number input', async ({ mount }) => {
      const component = await mount(<Input type="number" />);
      const input = component.getByRole('spinbutton');
      await expect(input).toHaveAttribute('type', 'number');
    });

    test('should render search input', async ({ mount }) => {
      const component = await mount(<Input type="search" />);
      const input = component.getByRole('searchbox');
      await expect(input).toHaveAttribute('type', 'search');
    });
  });

  test.describe('States', () => {
    test('should be disabled when disabled prop is true', async ({ mount }) => {
      const component = await mount(<Input disabled />);
      const input = component.getByRole('textbox');
      await expect(input).toBeDisabled();
    });

    test('should show error state with error prop', async ({ mount }) => {
      const component = await mount(<Input error="Error message" />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveClass(/border-destructive/);
    });

    test('should be required when required prop is true', async ({ mount }) => {
      const component = await mount(<Input required label="Required Field" />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveAttribute('required');
      await expect(component.getByText('*')).toBeVisible();
    });

    test('should be readonly when readOnly prop is true', async ({ mount }) => {
      const component = await mount(<Input readOnly value="Read only text" />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveAttribute('readOnly');
    });
  });

  test.describe('Value and Change Handling', () => {
    test('should display initial value', async ({ mount }) => {
      const component = await mount(<Input value="Initial value" onChange={() => {}} />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveValue('Initial value');
    });

    test('should call onChange when value changes', async ({ mount }) => {
      let changeCount = 0;
      const handleChange = () => {
        changeCount++;
      };

      const component = await mount(<Input onChange={handleChange} />);
      const input = component.getByRole('textbox');
      
      await input.fill('Hello');
      expect(changeCount).toBeGreaterThan(0);
      await expect(input).toHaveValue('Hello');
    });

    test('should handle controlled input correctly', async ({ mount }) => {
      const ControlledInput = () => {
        const [value, setValue] = React.useState('');
        return (
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        );
      };

      const component = await mount(<ControlledInput />);
      const input = component.getByRole('textbox');
      
      await input.fill('Controlled');
      await expect(input).toHaveValue('Controlled');
    });

    test('should handle uncontrolled input with defaultValue', async ({ mount }) => {
      const component = await mount(<Input defaultValue="Default" />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveValue('Default');
    });
  });

  test.describe('Events', () => {
    test('should call onFocus when input is focused', async ({ mount }) => {
      let focusCount = 0;
      const handleFocus = () => {
        focusCount++;
      };

      const component = await mount(<Input onFocus={handleFocus} />);
      const input = component.getByRole('textbox');
      
      await input.focus();
      expect(focusCount).toBe(1);
    });

    test('should call onBlur when input loses focus', async ({ mount }) => {
      let blurCount = 0;
      const handleBlur = () => {
        blurCount++;
      };

      const component = await mount(<Input onBlur={handleBlur} />);
      const input = component.getByRole('textbox');
      
      await input.focus();
      await input.blur();
      expect(blurCount).toBe(1);
    });

    test('should call onKeyDown when key is pressed', async ({ mount }) => {
      let keyDownCount = 0;
      const handleKeyDown = () => {
        keyDownCount++;
      };

      const component = await mount(<Input onKeyDown={handleKeyDown} />);
      const input = component.getByRole('textbox');
      
      await input.press('Enter');
      expect(keyDownCount).toBe(1);
    });
  });

  test.describe('Validation Attributes', () => {
    test('should apply minLength attribute', async ({ mount }) => {
      const component = await mount(<Input minLength={5} />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveAttribute('minLength', '5');
    });

    test('should apply maxLength attribute', async ({ mount }) => {
      const component = await mount(<Input maxLength={100} />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveAttribute('maxLength', '100');
    });

    test('should apply pattern attribute', async ({ mount }) => {
      const component = await mount(<Input pattern="[A-Za-z]+" />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
    });

    test('should apply min and max for number input', async ({ mount }) => {
      const component = await mount(<Input type="number" min={0} max={100} />);
      const input = component.getByRole('spinbutton');
      await expect(input).toHaveAttribute('min', '0');
      await expect(input).toHaveAttribute('max', '100');
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper label association', async ({ mount }) => {
      const component = await mount(<Input label="Email" id="email-input" />);
      const input = component.getByRole('textbox');
      const label = component.getByText('Email');
      
      await expect(input).toHaveAttribute('id', 'email-input');
      await expect(label).toHaveAttribute('for', 'email-input');
    });

    test('should show error message when error exists', async ({ mount }) => {
      const component = await mount(<Input error="Invalid input" />);
      const errorMessage = component.getByRole('alert');
      await expect(errorMessage).toContainText('Invalid input');
    });

    test('should display error message correctly', async ({ mount }) => {
      const component = await mount(<Input error="Error message" id="test-input" />);
      await expect(component.getByText('Error message')).toBeVisible();
    });

    test('should display helper text correctly', async ({ mount }) => {
      const component = await mount(<Input helperText="Helper message" id="test-input" />);
      await expect(component.getByText('Helper message')).toBeVisible();
    });

    test('should support aria-label', async ({ mount }) => {
      const component = await mount(<Input aria-label="Search input" />);
      await expect(component.getByRole('textbox', { name: /search input/i })).toBeVisible();
    });
  });

  test.describe('Additional Props', () => {
    test('should spread additional props to input element', async ({ mount }) => {
      const component = await mount(<Input data-testid="custom-input" autoComplete="email" />);
      const input = component.getByTestId('custom-input');
      await expect(input).toHaveAttribute('autoComplete', 'email');
    });

    test('should apply custom className to input', async ({ mount }) => {
      const component = await mount(<Input className="custom-class" />);
      const input = component.getByRole('textbox');
      await expect(input).toHaveClass(/custom-class/);
    });
  });
});

