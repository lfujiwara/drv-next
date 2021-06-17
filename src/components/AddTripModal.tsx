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
import { AddTripForm, AddTripFormValues } from "./AddTripForm";

function AddTripModal({
  children,
  initial,
  onMutate,
}: {
  children?: (fn: () => any) => any;
  initial?: Partial<AddTripFormValues>;
  onMutate?: () => any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { api } = useApi();
  const client = useQueryClient();
  const toast = useToast();

  return (
    <>
      {children && children(onOpen)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Corrida</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddTripForm
              initial={initial}
              onSubmit={(v) =>
                api
                  .post("/trips", {
                    customerId: v.customer?.id,
                    date: new Date(v.date + "").toISOString(),
                    origin: v.origin,
                    destination: v.destination,
                    fare: Number(v.fare) * 100,
                    distance: Number(v.distance) * 1000,
                    obs: v.obs,
                  })
                  .then(() => {
                    toast({
                      title: "Corrida adicionada",
                      status: "success",
                      isClosable: true,
                    });
                    client.invalidateQueries("/trips", { exact: false });
                    onClose();
                    onMutate && onMutate();
                  })
                  .catch(() =>
                    toast({
                      title: "Erro ao adicionar corrida",
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

export default AddTripModal;
