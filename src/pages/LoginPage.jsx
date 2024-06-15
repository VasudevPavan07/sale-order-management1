import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  useToast,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = () => {
    if (username === 'Admin' && password === 'Password') {
      localStorage.setItem('authenticated', 'true');
      navigate('/sale-orders');
    } else {
      toast({
        title: 'Invalid credentials',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="100vh" ml={500} display='flex'  alignItems="center" justifyContent="center">
      <Box p={8}
        maxWidth="400px"
        display={'flex'}
        borderRadius={8}
        boxShadow="lg"
        width="full">
        <VStack spacing={4} width="sm" p={6} boxShadow="md" borderRadius="md">
          <Heading>Login</Heading>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleLogin} colorScheme="blue" width="full">
            Login
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
