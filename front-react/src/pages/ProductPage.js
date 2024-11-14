import React from 'react';
import AddProductForm from '../components/forms/AddProductForm';
import ProductList from '../components/tables/ProductList';
import { Box, Typography, Container } from '@mui/material';

const ProductPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 4 }}>
        Gerenciamento de Estoque de Produtos
      </Typography>
      <Box>
        <AddProductForm />
      </Box>
      <Box sx={{ mt: 4 }}>
        <ProductList />
      </Box>
    </Container>
  );
};

export default ProductPage;
