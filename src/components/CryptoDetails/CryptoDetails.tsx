import { Paper, Typography } from '@mui/material';
import React from 'react';
import { CryptocurrencyDetails } from '../../types/types';
import './CryptoDetails.css';

interface CryptoDetailsProps {
  details: CryptocurrencyDetails;
}

const CryptoDetails: React.FC<CryptoDetailsProps> = ({ details }) => {
  return (
    <Paper className="crypto-details">
      <Typography variant="h5" gutterBottom>
        {details.name} ({details.symbol})
      </Typography>
      <Typography>Price (USD): ${parseFloat(details.priceUsd).toFixed(2)}</Typography>
      <Typography>Market Cap (USD): ${parseFloat(details.marketCapUsd).toLocaleString()}</Typography>
      <Typography>Supply: {parseFloat(details.supply).toLocaleString()}</Typography>
      <Typography>Max Supply: {details.maxSupply ? parseFloat(details.maxSupply).toLocaleString() : 'N/A'}</Typography>
      <Typography>24h Volume (USD): ${parseFloat(details.volumeUsd24Hr).toLocaleString()}</Typography>
      <Typography>24h Change: {parseFloat(details.changePercent24Hr).toFixed(2)}%</Typography>
    </Paper>
  );
};

export default CryptoDetails;