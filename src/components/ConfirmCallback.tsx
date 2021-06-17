import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function ConfirmCallback({
  children,
  title,
  message,
  onOk,
  onCancel,
}: {
  children: (fn: () => any) => any;
  title?: string;
  message?: string;
  onOk?: () => any;
  onCancel?: () => any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children(onOpen)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title || "Aviso"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{message || "Deseja continuar?"}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                onClose();
                onCancel && onCancel();
              }}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                onOk && onOk();
              }}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmCallback;
