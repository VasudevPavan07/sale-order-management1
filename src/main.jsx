import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './routes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <ChakraProvider>
  <AppRoutes />
  </ChakraProvider>
 
)
