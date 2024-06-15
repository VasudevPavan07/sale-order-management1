import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import SaleOrderForm from './SaleOrderForm';

const SaleOrderModal = ({ initialValues, isEdit, onSubmit, onClose }) => {
  const { isOpen, onOpen, onClose: modalClose } = useDisclosure();

  useEffect(() => {
    if (initialValues) {
      onOpen();
    }
  }, [initialValues, onOpen]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    modalClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => { modalClose(); onClose(); }} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SaleOrderForm initialValues={initialValues} onSubmit={handleFormSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => { modalClose(); onClose(); }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaleOrderModal;
