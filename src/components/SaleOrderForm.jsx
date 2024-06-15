import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Box,
  Checkbox,
} from '@chakra-ui/react';
import { Select as MultiSelect } from 'chakra-react-select';

const SaleOrderForm = ({initialValues,onSubmit }) => {
  const { control, handleSubmit, register , reset } = useForm({
    defaultValues: {
      defaultValues: initialValues,
    },
  });

  React.useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch products
    fetch('products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data));

    // Fetch customers
    fetch('customers.json')
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  }, []);

  const handleFormSubmit = (data) => {
    // Save data to local storage
    const saleOrders = JSON.parse(localStorage.getItem('saleOrders')) || [];
    saleOrders.push(data);
    localStorage.setItem('saleOrders', JSON.stringify(saleOrders));

    onSubmit(data);
  };

  return (
    <Box width="100%">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={4} width="100%" align="stretch">
          <FormControl>
            <FormLabel>Customer</FormLabel>
            <select {...register('customer_id')}>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.customer_profile.id}>
                  {customer.customer_profile.name}
                </option>
              ))}
            </select>
          </FormControl>

          {fields.map((item, index) => (
            <HStack key={item.id} spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Product</FormLabel>
                <Controller
                  control={control}
                  name={`items.${index}.sku_id`}
                  render={({ field }) => (
                    <MultiSelect
                      {...field}
                      options={products.map((product) => ({
                        value: product.sku_id,
                        label: product.name,
                      }))}
                      closeMenuOnSelect={false}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input {...register(`items.${index}.price`)} />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input {...register(`items.${index}.quantity`)} />
              </FormControl>
              <Button onClick={() => remove(index)}>Remove</Button>
            </HStack>
          ))}
          <Button onClick={() => append({ sku_id: '', price: '', quantity: '' })}>Add Product</Button>

          <FormControl>
            <FormLabel>Invoice No</FormLabel>
            <Input {...register('invoice_no')} />
          </FormControl>

          <FormControl>
            <FormLabel>Invoice Date</FormLabel>
            <Input type="date" {...register('invoice_date')} />
          </FormControl>

          <FormControl>
            <FormLabel>Paid</FormLabel>
            <Checkbox {...register('paid')} />
          </FormControl>

          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SaleOrderForm;
