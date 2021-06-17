import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useApi } from "../hooks/api";
import { AddCustomerForm } from "./AddCustomerForm";

function AddCustomerModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { api } = useApi();
  const client = useQueryClient();
  const toast = useToast();

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Adicionar cliente"
        icon={<FaPlus />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddCustomerForm
              verifyPhoneNumber={(q) =>
                api
                  .get("/customers/verify-phone-number", { params: { q } })
                  .then(() => true)
                  .catch(() => false)
              }
              onSubmit={(v) =>
                api
                  .post("/customers", v)
                  .then(() => {
                    toast({
                      title: "Cliente adicionado",
                      status: "success",
                      isClosable: true,
                    });
                    client.invalidateQueries("/customers", { exact: false });
                    onClose();
                  })
                  .catch(() =>
                    toast({
                      title: "Erro ao adicionar cliente",
                      status: "error",
                      isClosable: true,
                    })
                  )
              }
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCustomerModal;
