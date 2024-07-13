import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Cryptocurrency } from '../../types/types';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import './CryptoTable.css';

interface CryptoTableProps {
  cryptocurrencies: Cryptocurrency[];
  onSort: (key: keyof Cryptocurrency) => void;
  sortKey: keyof Cryptocurrency;
  sortDirection: 'asc' | 'desc';
}

const CryptoTable: React.FC<CryptoTableProps> = ({ cryptocurrencies, onSort, sortKey, sortDirection }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '60vh'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortKey === 'symbol'}
                direction={sortKey === 'symbol' ? sortDirection : 'asc'}
                onClick={() => onSort('symbol')}
              >
                Symbol
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortKey === 'name'}
                direction={sortKey === 'name' ? sortDirection : 'asc'}
                onClick={() => onSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>Market Cap (USD)</TableCell>
            <TableCell>Favorite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptocurrencies.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell>{crypto.symbol}</TableCell>
              <TableCell>
                <Link to={`/details/${crypto.id}`}>{crypto.name}</Link>
              </TableCell>
              <TableCell>{parseFloat(crypto.priceUsd).toFixed(2)}</TableCell>
              <TableCell>{parseFloat(crypto.marketCapUsd).toLocaleString()}</TableCell>
              <TableCell>
                <FavoriteButton id={crypto.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;