import React from 'react'
import {Box ,Heading} from '@chakra-ui/react'
import Layout from '../components/Layout'
import SaleOrderForm  from '../components/SaleOrderForm'

const SaleOrderPage = () => {
  return (
  <Layout>
    <Box>
        <Heading>
            Sale Order
        </Heading>
        <SaleOrderForm />
    </Box>
    </Layout>
  )
}

export default SaleOrderPage
