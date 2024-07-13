import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { CustomThemeProvider } from './contexts/ThemeContext';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import TablePage from './pages/TablePage/TablePage';

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route index path="/" element={<TablePage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
          </Layout>
        </Router>
    </CustomThemeProvider>
  );
};

export default App