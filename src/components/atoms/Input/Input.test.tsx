import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render input element', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render with label when provided', () => {
      render(<Input label="Email Address" />);
      const label = screen.getByText('Email Address');
      expect(label).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter your email" />);
      const input = screen.getByPlaceholderText('Enter your email');
      expect(input).toBeInTheDocument();
    });

    it('should render error message when provided', () => {
      render(<Input error="This field is required" />);
      const error = screen.getByText('This field is required');
      expect(error).toBeInTheDocument();
    });

    it('should render helper text when provided', () => {
      render(<Input helperText="Enter a valid email address" />);
      const helper = screen.getByText('Enter a valid email address');
      expect(helper).toBeInTheDocument();
    });
  });

  describe('Input Types', () => {
    it('should render text input by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render email input', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render password input', () => {
      render(<Input type="password" placeholder="Password" />);
      const input = screen.getByPlaceholderText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('should render number input', () => {
      render(<Input type="number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('should render search input', () => {
      render(<Input type="search" />);
      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('type', 'search');
    });
  });

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should show error state with error prop', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-destructive');
    });

    it('should be required when required prop is true', () => {
      render(<Input required label="Required Field" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('required');
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should be readonly when readOnly prop is true', () => {
      render(<Input readOnly value="Read only text" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readOnly');
    });
  });

  describe('Value and Change Handling', () => {
    it('should display initial value', () => {
      render(<Input value="Initial value" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Initial value');
    });

    it('should call onChange when value changes', async () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'Hello');

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('Hello');
    });

    it('should handle controlled input correctly', async () => {
      const ControlledInput = () => {
        const [value, setValue] = React.useState('');
        return (
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        );
      };

      render(<ControlledInput />);
      const input = screen.getByRole('textbox');

      await userEvent.type(input, 'Controlled');
      expect(input).toHaveValue('Controlled');
    });

    it('should handle uncontrolled input with defaultValue', () => {
      render(<Input defaultValue="Default" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Default');
    });
  });

  describe('Events', () => {
    it('should call onFocus when input is focused', () => {
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');

      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('should call onBlur when input loses focus', () => {
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');

      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('should call onKeyDown when key is pressed', () => {
      const handleKeyDown = jest.fn();
      render(<Input onKeyDown={handleKeyDown} />);
      const input = screen.getByRole('textbox');

      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('Validation Attributes', () => {
    it('should apply minLength attribute', () => {
      render(<Input minLength={5} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('minLength', '5');
    });

    it('should apply maxLength attribute', () => {
      render(<Input maxLength={100} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('maxLength', '100');
    });

    it('should apply pattern attribute', () => {
      render(<Input pattern="[A-Za-z]+" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
    });

    it('should apply min and max for number input', () => {
      render(<Input type="number" min={0} max={100} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      render(<Input label="Email" id="email-input" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Email');

      expect(input).toHaveAttribute('id', 'email-input');
      expect(label).toHaveAttribute('for', 'email-input');
    });

    it('should show error message when error exists', () => {
      render(<Input error="Invalid input" />);
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Invalid input');
    });

    it('should display error message correctly', () => {
      render(<Input error="Error message" id="test-input" />);
      const error = screen.getByText('Error message');
      expect(error).toBeInTheDocument();
    });

    it('should display helper text correctly', () => {
      render(<Input helperText="Helper message" id="test-input" />);
      const helper = screen.getByText('Helper message');
      expect(helper).toBeInTheDocument();
    });

    it('should support aria-label', () => {
      render(<Input aria-label="Search input" />);
      const input = screen.getByRole('textbox', { name: /search input/i });
      expect(input).toBeInTheDocument();
    });
  });

  describe('Additional Props', () => {
    it('should spread additional props to input element', () => {
      render(<Input data-testid="custom-input" autoComplete="email" />);

      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('autoComplete', 'email');
    });

    it('should apply custom className to input', () => {
      render(<Input className="custom-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });
});
