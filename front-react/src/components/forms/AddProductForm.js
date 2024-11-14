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
    onSubmit: (values, { resetForm }) => {
      addProduct(values);
      resetForm();
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
