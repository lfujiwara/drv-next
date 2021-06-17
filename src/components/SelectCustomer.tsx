import {
  Box,
  Button,
  Center,
  Flex,
  FlexProps,
  IconButton,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useQueryCustomers } from "../hooks/useQueryCustomers";

type TCustomer = { id: number; name: string; phoneNumber: string };

function SelectCustomer({
  value,
  onChange,
  flexProps,
}: {
  value?: TCustomer;
  onChange?: (customer?: TCustomer) => any;
  flexProps?: FlexProps;
}) {
  const [state, setState] = useState<TCustomer | undefined>(value);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { q, setQ, query } = useQueryCustomers(3);

  const select = (customer: TCustomer) => {
    setState(customer);
    onClose();
  };
  const reset = () => setState(undefined);

  useEffect(() => {
    if (value?.id != state?.id) setState(value);
  }, [value]);

  useEffect(() => {
    if (value?.id != state?.id) onChange && onChange(state);
  }, [state]);

  return (
    <>
      <Flex
        p="4"
        justify="space-between"
        alignItems="center"
        shadow="md"
        rounded="md"
        border="1px"
        borderColor="gray.200"
        {...flexProps}
      >
        <Box>
          <Text mr="2">
            {state?.name || <Link onClick={onOpen}>Selecionar cliente</Link>}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {state?.phoneNumber}
          </Text>
        </Box>
        {value && (
          <IconButton
            onClick={reset}
            aria-label="Deselecionar cliente"
            icon={<IoClose />}
          />
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecionar cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Input
                placeholder="Buscar"
                value={q}
                onChange={(evt) => setQ(evt.target.value)}
                flex="1"
                mr="2"
              />
            </Flex>
            <SimpleGrid mt="2" gap="4" columns={[1]}>
              <AnimatePresence>
                {query.data?.pages
                  .map((p) => p.values)
                  .flat()
                  .map((v) => (
                    <Flex
                      as={Button}
                      key={v.id}
                      p="2"
                      justify="space-between"
                      onClick={() => select(v)}
                    >
                      <Text>{v.name}</Text>
                      <Text fontWeight="400">{v.phoneNumber}</Text>
                    </Flex>
                  ))}
              </AnimatePresence>
            </SimpleGrid>
            <Center py="4">
              <Button
                onClick={() => query.fetchNextPage()}
                disabled={!query.hasNextPage}
              >
                Carregar mais
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SelectCustomer;
