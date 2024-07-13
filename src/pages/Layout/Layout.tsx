import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = ({ children }: any) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div>
      <IconButton onClick={toggleDarkMode} color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      
      {children}
    </div>
  );
};

export default Layout