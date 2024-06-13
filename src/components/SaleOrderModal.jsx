import React from 'react';
import {Modal ,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,useDisclosure} from '@chakra-ui/react';
import SaleOrderForm from './SaleOrderForm';
const SaleOrderModal = () => {
  const {isOpen ,onOpen ,onClose} = useDisclosure();

  const handleFormSubmit = (data) =>{
    console.log('Sale Order Data:', data);
    onClose();
  };
    return (
    <>
    <button onClick={onOpen} colorScheme='blue'>
        + Sale Order
        </button>
        <Modal isOpen = {isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Sale Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SaleOrderForm onSubmit={handleFormSubmit} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>       
        </>
  );
};

export default SaleOrderModal
