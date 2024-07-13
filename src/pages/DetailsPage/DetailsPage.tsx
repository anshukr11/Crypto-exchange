import { CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CryptoDetails from '../../components/CryptoDetails/CryptoDetails';
import { CryptocurrencyDetails } from '../../types/types';
import { fetchCryptocurrencyDetails } from '../../utils/api';
import './DetailsPage.css';


const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<CryptocurrencyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await fetchCryptocurrencyDetails(id);
          setDetails(data);
          setError(null);
        } catch (err) {
          setError('Failed to fetch cryptocurrency details. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!details) {
    return <Typography>No data available for this cryptocurrency.</Typography>;
  }

  return (
    <Container className="details-page">
      <Typography variant="h4" gutterBottom>
        Cryptocurrency Details
      </Typography>
      <CryptoDetails details={details} />
    </Container>
  );
};

export default DetailsPage;