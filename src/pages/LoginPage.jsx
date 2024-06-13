import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Box,Button,Input,FormControl,FormLabel,Heading,VStack, useToast,} from '@chakra-ui/react'

const LoginPage = () => {
    const [username ,setusername] =useState('');
    const [password,setpassword] =useState('');
    const navigate =useNavigate();
    const toast =useToast();
    const handleLogin =() =>{
        if(username === 'admin' && password === 'password'){
            localStorage.setItem('authenticated' ,'true');
            navigate('/sale-orders');
        }else{
            toast({
                title: 'Invalid crdentials',
                status:'error',
                duration:3000,
                isClosable:true,
            });
        }

    };
  return (
    <Box minH='100vh' display='flex' alignItems='center' justifyContent='center'>
        <VStack spacing={4} width='sm' p={6} boxShadow='md' bordrRadius='md'>
            <Heading>Login</Heading>
            <FormControl>
                <FormLabel>username</FormLabel>
                <Input value={username} onChange={(e) => setusername(e.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' value= {password} onChange={(e) => setpassword(e.target.value)} />
            </FormControl>
                <Button onClick={handleLogin} colorScheme='blue' width='full'>
                    Login
                </Button>
        </VStack>
    </Box>
  )
}

export default LoginPage
