import {
  Button,
  Center,
  Container,
  Flex,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import React from "react";
import AddCustomerModal from "../../components/AddCustomerModal";
import CustomerCard from "../../components/CustomerCard";
import { useQueryCustomers } from "../../hooks/useQueryCustomers";

function Customers() {
  const { q, setQ, query } = useQueryCustomers();

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <Container maxWidth="container.xl">
        <Flex>
          <Input
            placeholder="Buscar"
            value={q}
            onChange={(evt) => setQ(evt.target.value)}
            flex="1"
            mr="2"
          />
          <AddCustomerModal />
        </Flex>
        <SimpleGrid mt="2" gap="4" columns={[1, 1, 2, 3]}>
          <AnimatePresence>
            {query.data?.pages
              .map((p) => p.values)
              .flat()
              .map((v) => (
                <CustomerCard key={v.id} {...v} />
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
      </Container>
    </>
  );
}

export default Customers;
