import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CryptoTable from '../CryptoTable/CryptoTable';

const mockCryptocurrencies = [
  {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    priceUsd: '50000',
    marketCapUsd: '1000000000000',
  },
];

test('renders CryptoTable with correct data', () => {
  render(
    <Router>
      <CryptoTable
        cryptocurrencies={mockCryptocurrencies}
        onSort={() => {}}
        sortKey="rank"
        sortDirection="asc"
      />
    </Router>
  );

  expect(screen.getByText('BTC')).toBeInTheDocument();
  expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  expect(screen.getByText('50000.00')).toBeInTheDocument();
  expect(screen.getByText('1,000,000,000,000')).toBeInTheDocument();
});