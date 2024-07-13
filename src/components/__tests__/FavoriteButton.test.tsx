import { fireEvent, render, screen } from '@testing-library/react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

describe('FavoriteButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders unfavorited button by default', () => {
    render(<FavoriteButton id="bitcoin" />);
    expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();
  });

  test('toggles favorite status on click', () => {
    render(<FavoriteButton id="bitcoin" />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument();
  });

  test('persists favorite status in localStorage', () => {
    render(<FavoriteButton id="bitcoin" />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(JSON.parse(localStorage.getItem('favorites') || '[]')).toContain('bitcoin');

    fireEvent.click(button);
    expect(JSON.parse(localStorage.getItem('favorites') || '[]')).not.toContain('bitcoin');
  });
});