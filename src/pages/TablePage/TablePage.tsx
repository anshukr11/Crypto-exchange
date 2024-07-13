import { Box, CircularProgress, Container, Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CryptoTable from '../../components/CryptoTable/CryptoTable';
import { Cryptocurrency } from '../../types/types';
import { fetchCryptocurrencies } from '../../utils/api';
import './TablePage.css';

const TablePage: React.FC = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof Cryptocurrency>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchCryptocurrencies(10, (page - 1) * 10);
      setCryptocurrencies(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [page]);

  const handleSort = (key: keyof Cryptocurrency) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedCryptocurrencies = [...cryptocurrencies].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container className="table-page">
      <Typography variant="h4" gutterBottom>
        Cryptocurrency Data
      </Typography>
      <CryptoTable
        cryptocurrencies={sortedCryptocurrencies}
        onSort={handleSort}
        sortKey={sortKey}
        sortDirection={sortDirection}
      />
      <Pagination
        count={10}
        page={page}
        onChange={(_, value) => setPage(value)}
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default TablePage;