// src/components/SaleOrderForm.jsx
import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Select,
} from '@chakra-ui/react';
import { Select as MultiSelect } from 'chakra-react-select';

// Mock data
const products = [
  { id: 1, name: 'Product 1', sku_id: 101 },
  { id: 2, name: 'Product 2', sku_id: 102 },
  { id: 3, name: 'Product 3', sku_id: 103 },
];

const customers = [
  {
    id: 9,
    customer: 11908,
    customer_profile: {
      id: 11908,
      name: 'Ram',
      email: 'jesus_christ@church.com',
      pincode: 'Mumbai',
      location_name: 'Mumbai, Maharashtra, India',
      type: 'C',
      profile_pic: null,
      gst: '',
    },
  },
];

const SaleOrderForm = () => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      customer_id: '',
      items: [{ sku_id: '', price: '', quantity: '' }],
      paid: false,
      invoice_no: '',
      invoice_date: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <form width={500}  onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} width={500} align="stretch">
        <FormControl>
          <FormLabel>Customer</FormLabel>
          <Input />
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

        <Button type="submit">Submit</Button>
      </VStack>
    </form>
  );
};

export default SaleOrderForm;
