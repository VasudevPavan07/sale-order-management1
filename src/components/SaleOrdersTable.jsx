import React from 'react'
import {
    Table,Thead,Tbody,Tr,Th,Td,Button} from '@chakra-ui/react';


const SaleOrdersTable = ({orders,onEdit,OnDelete,isCompleted}) => {
  return (
   <Table variant='simple'>
    <Thead>
        <Tr>
            <Th>Invoice No</Th>
            <Th>Customer ID</Th>
            <Th>SKU</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Invoice Date</Th>
            {!isCompleted && <Th>Actions</Th>}

        </Tr>
    </Thead>
    <Tbody>
        {orders.map((order)=>(
            <Tr key={order.invoice_no}>
                <Td>{order.invoice_no}</Td>
                <Td>{order.customer_id}</Td>
                <Td>{order.sku_id}</Td>
                <Td>{order.quantity}</Td>
                <Td>{order.price}</Td>
                <Td>{order.invoice_date}</Td>
                {!isCompleted && (
                    <Td>
                     <Button onClick={() =>onEdit(order)} colorScheme='blue' size='sm' mr={2}>Edit</Button>   
                    <Button onClick={() => OnDelete(order)} colorScheme='red' size='sm'  >Delete</Button>
                    </Td>
                )}
            </Tr>
        ))}
    </Tbody>
   </Table>
  );
};

export default SaleOrdersTable;
