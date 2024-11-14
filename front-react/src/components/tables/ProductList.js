import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ProductList = () => {
  const { products, setProducts, deleteProduct, loading, setLoading } = useContext(ProductContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Inicia o estado de carregamento
      try {
        const response = await fetch('http://localhost:8000/api/produtos/');
        if (!response.ok) {
          throw new Error('Erro ao carregar os produtos');
        }
        const data = await response.json();
        setProducts(data); // Atualiza o estado com os produtos recebidos
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchProducts();
  }, [setProducts, setLoading]);

  if (loading) return <p>Carregando...</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button color="secondary" onClick={() => deleteProduct(product.id)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;