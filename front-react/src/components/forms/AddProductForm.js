import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductContext } from '../../contexts/ProductContext';
import { TextField, Button, Box } from '@mui/material';

const AddProductForm = () => {
  const { addProduct } = useContext(ProductContext);

  const formik = useFormik({
    initialValues: { name: '', quantity: '', price: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Nome é obrigatório'),
      quantity: Yup.number().required('Quantidade é obrigatória').min(1),
      price: Yup.number().required('Preço é obrigatório').min(0),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Fazendo a requisição POST para o backend Django
        const response = await fetch('http://localhost:8000/api/produtos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Erro ao adicionar produto');
        }

        const data = await response.json();
        
        // Atualize o contexto com o novo produto
        addProduct(data);

        // Reseta o formulário após o envio
        resetForm();
      } catch (error) {
        console.error('Erro:', error);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', gap: 2 }}>
      <TextField
        name="name"
        label="Nome do Produto"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        name="quantity"
        label="Quantidade"
        type="number"
        value={formik.values.quantity}
        onChange={formik.handleChange}
        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
        helperText={formik.touched.quantity && formik.errors.quantity}
      />
      <TextField
        name="price"
        label="Preço"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
      />
      <Button type="submit" variant="contained" color="primary">
        Adicionar
      </Button>
    </Box>
  );
};

export default AddProductForm;
