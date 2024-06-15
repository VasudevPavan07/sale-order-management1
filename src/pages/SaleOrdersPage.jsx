import React, { useState } from 'react';
import { Box, Heading, Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import Layout from '../components/Layout';
import SaleOrdersTable from '../components/SaleOrdersTable';
import SaleOrderModal from '../components/SaleOrderModal';

const SaleOrdersPage = () => {
  const [orders, setOrders] = useState([
    { invoice_no: 123, customer_id: '11908', sku_id: '220', quantity: 12, price: 120, invoice_date: '2024-06-01', paid: false },
    { invoice_no: 124, customer_id: '11909', sku_id: '221', quantity: 15, price: 150, invoice_date: '2024-06-02', paid: true },
  ]);

  const handleEditOrder = (editedOrder) => {
    // Implement editing logic here if needed
    console.log('Editing order:', editedOrder);
    // Example of updating state:
    const updatedOrders = orders.map(order => order.invoice_no === editedOrder.invoice_no ? editedOrder : order);
    setOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderToDelete) => {
    // Filter out the order to delete
    setOrders(prevOrders => prevOrders.filter(order => order.invoice_no !== orderToDelete.invoice_no));
  };

  const activeOrders = orders.filter((order) => !order.paid);
  const completedOrders = orders.filter((order) => order.paid);

  return (
    <Layout>
      <Box p={4} width='96.9vw'>
        <Heading mb={4}>Sale Orders</Heading>
        <SaleOrderModal />
        <Tabs mt={4}>
        
          <TabPanels>
            <TabPanel>
              <SaleOrdersTable orders={activeOrders} onEdit={handleEditOrder} onDelete={handleDeleteOrder} isCompleted={false} />
            </TabPanel>
            <TabPanel>
              <SaleOrdersTable orders={completedOrders} isCompleted={true} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export default SaleOrdersPage;
