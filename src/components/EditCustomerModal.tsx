import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useQueryClient } from "react-query";
import { useApi } from "../hooks/api";
import { CustomerData } from "../util/apiResponse";
import { AddCustomerForm } from "./AddCustomerForm";

function EditCustomerModal({
  children,
  data,
  onMutate,
}: {
  children?: (onOpen: () => any) => any;
  onMutate?: () => any;
  data: CustomerData;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { api } = useApi();
  const client = useQueryClient();
  const toast = useToast();

  const verify = (q?: string) =>
    q === data.phoneNumber
      ? Promise.resolve(true)
      : api
          .get("/customers/verify-phone-number", { params: { q } })
          .then(() => true)
          .catch(() => false);

  return (
    <>
      {children && children(onOpen)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar cliente - {data?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddCustomerForm
              initial={data}
              verifyPhoneNumber={verify}
              onSubmit={(v) =>
                api
                  .patch(`/customers/${data.id}`, {
                    phoneNumber: v.phoneNumber,
                    name: v.name,
                  })
                  .then(() => {
                    toast({
                      title: "Cliente editado com sucesso",
                      status: "success",
                      isClosable: true,
                    });
                    client.invalidateQueries("/customers", { exact: false });
                    onClose();
                    onMutate && onMutate();
                  })
                  .catch(() =>
                    toast({
                      title: "Erro ao editar cliente",
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

export default EditCustomerModal;
