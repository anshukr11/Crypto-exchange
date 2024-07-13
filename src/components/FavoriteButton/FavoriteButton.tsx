import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  id: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter((favId: string) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <IconButton className={`favorite-button ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
    {isFavorite ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default FavoriteButton;