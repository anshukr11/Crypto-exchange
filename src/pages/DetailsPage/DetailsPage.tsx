import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import CryptoDetails from '../../components/CryptoDetails/CryptoDetails';
import { CryptocurrencyDetails } from '../../types/types';
import { fetchCryptocurrencyDetails } from '../../utils/api';
import './DetailsPage.css';


const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<CryptocurrencyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  
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

  const handleBack = () => {
    navigate("/");
  }

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
      <Box display={'flex'} alignItems={'start'} justifyContent={'flex-start'}>
        <Box onClick={handleBack} sx={{ cursor: 'pointer'}}>
          <ArrowBackIcon fontSize='large' />
        </Box>
      <Typography variant="h4" gutterBottom ml={12}>
        Cryptocurrency Details
      </Typography>
      </Box>
      <CryptoDetails details={details} />
    </Container>
  );
};

export default DetailsPage;