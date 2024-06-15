import React, { useEffect, useState } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Table, Thead, Tbody, Tr, Th, Td, Button, VStack } from '@chakra-ui/react';
import SaleOrderModal from './SaleOrderModal';

const SaleOrderTabs = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    const saleOrders = JSON.parse(localStorage.getItem('saleOrders')) || [];
    setOrders(saleOrders);
  }, []);

  const handleFormSubmit = (data) => {
    let updatedOrders = [...orders];
    
    // Check if editing or adding a new order
    if (editingOrder && editingOrder.invoice_no) {
      updatedOrders = updatedOrders.map(order =>
        order.invoice_no === editingOrder.invoice_no ? { ...data, invoice_no: order.invoice_no } : order
      );
    } else {
      // Assign a unique invoice_no if it's a new order
      data.invoice_no = Math.max(...updatedOrders.map(order => order.invoice_no), 0) + 1;
      updatedOrders.push(data);
    }

    localStorage.setItem('saleOrders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setEditingOrder(null);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
  };

  const handleCloseModal = () => {
    setEditingOrder(null);
  };

  const handleClearCache = () => {
    localStorage.removeItem('saleOrders');
    setOrders([]);
  };

  const handleDeleteOrder = (invoice_no) => {
    const updatedOrders = orders.filter(order => order.invoice_no !== invoice_no);
    localStorage.setItem('saleOrders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const activeOrders = orders.filter(order => !order.paid);
  const completedOrders = orders.filter(order => order.paid);

  const renderOrders = (orders, isCompleted) => (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Customer ID</Th>
          <Th>Invoice No</Th>
          <Th>Invoice Date</Th>
          <Th>Paid</Th>
          <Th>Items</Th>
          {!isCompleted && <Th>Actions</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order, index) => (
          <Tr key={index}>
            <Td>{order.customer_id}</Td>
            <Td>{order.invoice_no}</Td>
            <Td>{order.invoice_date}</Td>
            <Td>{order.paid ? 'Yes' : 'No'}</Td>
            <Td>
              {order.items.map((item, idx) => (
                <Box key={idx}>
                  {`SKU: ${item.sku_id}, Price: ${item.price}, Quantity: ${item.quantity}`}
                </Box>
              ))}
            </Td>
            {!isCompleted && (
              <Td>
                <Button colorScheme="blue" onClick={() => handleEditOrder(order)}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDeleteOrder(order.invoice_no)}>
                  Delete
                </Button>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  return (
    <Box>
      <VStack align="stretch" spacing={4}>
        <Tabs>
          <TabList>
            <Tab>Active Orders</Tab>
            <Tab>Completed Orders</Tab>
          </TabList>
          <Button m={2} mb={5} mt={8} colorScheme='blue' onClick={() => setEditingOrder({})}>
          + Sale Order
        </Button>
        <Button  mb={5} mt={8} colorScheme='red' onClick={handleClearCache}>
          Clear Cache
        </Button>
          <TabPanels>
            <TabPanel>{renderOrders(activeOrders, false)}</TabPanel>
            <TabPanel>{renderOrders(completedOrders, true)}</TabPanel>
          </TabPanels>
        </Tabs>
      
      </VStack>
      {editingOrder !== null && (
        <SaleOrderModal
          initialValues={editingOrder}
          isEdit={!!editingOrder.invoice_no}
          onSubmit={handleFormSubmit}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default SaleOrderTabs;
