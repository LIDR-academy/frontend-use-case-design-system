import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('should render card with children', () => {
      render(
        <Card>
          <p>Card content</p>
        </Card>
      );

      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should render with title when provided', () => {
      render(
        <Card title="Card Title">
          <p>Content</p>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('should render with subtitle when provided', () => {
      render(
        <Card title="Title" subtitle="This is a subtitle">
          <p>Content</p>
        </Card>
      );

      expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
    });

    it('should render header actions when provided', () => {
      const ActionButton = () => <button>Action</button>;

      render(
        <Card title="Title" headerActions={<ActionButton />}>
          <p>Content</p>
        </Card>
      );

      expect(
        screen.getByRole('button', { name: 'Action' })
      ).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply elevated variant classes by default', () => {
      render(
        <Card data-testid="card">
          <p>Content</p>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-card');
      expect(card).toHaveClass('shadow-md');
    });

    it('should apply outlined variant classes', () => {
      render(
        <Card variant="outlined" data-testid="card">
          <p>Content</p>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-card');
      expect(card).toHaveClass('border');
    });

    it('should apply filled variant classes', () => {
      render(
        <Card variant="filled" data-testid="card">
          <p>Content</p>
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-muted');
    });
  });

  describe('Click Interactions', () => {
    it('should call onClick when card is clicked', () => {
      const handleClick = jest.fn();

      render(
        <Card onClick={handleClick}>
          <p>Clickable content</p>
        </Card>
      );

      const card = screen.getByRole('button');
      fireEvent.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be focusable when onClick is provided', () => {
      const handleClick = jest.fn();

      render(
        <Card onClick={handleClick}>
          <p>Focusable content</p>
        </Card>
      );

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('should trigger onClick on Enter key press', () => {
      const handleClick = jest.fn();

      render(
        <Card onClick={handleClick}>
          <p>Keyboard accessible</p>
        </Card>
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
