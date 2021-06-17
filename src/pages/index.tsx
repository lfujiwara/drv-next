import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import React, { ChangeEvent } from "react";
import CustomerTripCard from "../components/CustomerTripCard";
import SelectMonth from "../components/SelectMonth";
import TripSummary from "../components/TripSummary";
import { useQueryTrips } from "../hooks/useQueryTrips";
import { useQueryTripSummary } from "../hooks/useQueryTripSummary";

export default function Home() {
  const {
    period: queryPeriod,
    setPeriod: setQueryPeriod,
    query,
  } = useQueryTrips();
  const { setPeriod: setSummaryPeriod, query: summaryQuery } =
    useQueryTripSummary();

  const handleChangeMonth = (evt: ChangeEvent<HTMLSelectElement>) => {
    const next = {
      from: { ...queryPeriod.from, month: Number(evt.target.value) },
      to: { ...queryPeriod.to, month: Number(evt.target.value) },
    };
    setQueryPeriod(next);
    setSummaryPeriod(next);
  };
  const handleChangeYear = (evt: ChangeEvent<HTMLInputElement>) => {
    const next = {
      from: {
        ...queryPeriod.from,
        year: evt.target.value === "" ? "" : Number(evt.target.value),
      },
      to: {
        ...queryPeriod.to,
        year: evt.target.value === "" ? "" : Number(evt.target.value),
      },
    };
    setQueryPeriod(next);
    setSummaryPeriod(next);
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container maxWidth="container.xl">
        <Flex justify="space-between">
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Home - Relatório
            </Text>
          </Box>
          <Box maxW="64" mt={[4, 0]}>
            <Text
              direction={["left", "right"]}
              mb="2"
              fontSize="lg"
              fontWeight="medium"
            >
              Período
            </Text>
            <HStack>
              <SelectMonth
                flex="2"
                value={queryPeriod.from.month}
                onChange={handleChangeMonth}
              />
              <Input
                placeholder="Ano"
                type="number"
                min="0"
                flex="1"
                value={queryPeriod.from.year}
                onChange={handleChangeYear}
              />
            </HStack>
          </Box>
        </Flex>
        <Box mt="4">
          <Text fontSize="xl" fontWeight="medium" mb="2">
            Relatório
          </Text>
          <TripSummary data={summaryQuery.data} />
        </Box>
        <Box mt="4">
          <Text fontSize="xl" fontWeight="medium" mb="2">
            Corridas
          </Text>
          <SimpleGrid mt="2" gap="4" columns={[1, 1, 2, 3]}>
            <AnimatePresence>
              {query.data?.pages
                .map((p) => p.values)
                .flat()
                .map((v) => (
                  <CustomerTripCard key={v.id} data={v} />
                ))}
            </AnimatePresence>
          </SimpleGrid>
        </Box>
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
