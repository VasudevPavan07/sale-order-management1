import React from 'react'
import {Box,Flex} from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';


const Layout = ({children}) => {
  return (
<Box>
    <Flex justify='space-between' align='center' p={4} bg='blue.500' color='white'>
        <Box>
            <h1>My App</h1>
        </Box>
        <Box>
            <ThemeToggle />
        </Box>
    </Flex>
    <Box p={4}>
        {children}
    </Box>
</Box>

  );
};

export default Layout;
