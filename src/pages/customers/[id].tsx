import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  Link,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit, FaWhatsapp } from "react-icons/fa";
import AddTripModal from "../../components/AddTripModal";
import ConfirmCallback from "../../components/ConfirmCallback";
import CustomerTripCard from "../../components/CustomerTripCard";
import EditCustomerModal from "../../components/EditCustomerModal";
import { MultiSummary } from "../../components/MultiSummary";
import SelectMonth from "../../components/SelectMonth";
import { useApi } from "../../hooks/api";
import { useCustomerData } from "../../hooks/useCustomerData";
import { useTripPayment } from "../../hooks/useTripPayment";
import { CustomerData } from "../../util/apiResponse";

function CustomerPage({ id }: { id: number }) {
  const router = useRouter();
  const toast = useToast();
  const { api } = useApi();
  const { data, multiSummary, summary, trips, period, setPeriod } =
    useCustomerData(id);
  const { pay, unPay } = useTripPayment({
    onMutate: () => {
      trips.refetch();
      multiSummary.refetch();
      summary.refetch();
    },
  });

  const onMutate = () => {
    trips.refetch();
    multiSummary.refetch();
    summary.refetch();
  };
  const onDelete = () => {
    api.delete(`/customers/${id}`).then(() => {
      router.push("/customers");
      toast({ title: "Cliente excluído", status: "warning" });
    });
  };

  const handleChangeMonth = (evt: ChangeEvent<HTMLSelectElement>) =>
    setPeriod({
      from: { ...period.from, month: Number(evt.target.value) },
      to: { ...period.to, month: Number(evt.target.value) },
    });
  const handleChangeYear = (evt: ChangeEvent<HTMLInputElement>) =>
    setPeriod({
      from: {
        ...period.from,
        year: evt.target.value === "" ? "" : Number(evt.target.value),
      },
      to: {
        ...period.to,
        year: evt.target.value === "" ? "" : Number(evt.target.value),
      },
    });

  return (
    <>
      <Head>
        <title>Cliente - {data.data?.name}</title>
      </Head>
      <Box>
        <Flex justify="space-between" direction={["column", "row"]}>
          <HStack flex="1" justifyContent={["space-between", "flex-start"]}>
            <Box>
              <Text fontWeight="bold" fontSize="xl">
                {data.data?.name}
              </Text>
              <Text color="gray.500">{data.data?.phoneNumber}</Text>
            </Box>
            {data && (
              <EditCustomerModal
                data={data.data as CustomerData}
                onMutate={() => data.refetch()}
              >
                {(onOpen) => (
                  <IconButton
                    aria-label="Editar cliente"
                    onClick={onOpen}
                    icon={<FaEdit />}
                  />
                )}
              </EditCustomerModal>
            )}
          </HStack>
          <Box mt={[4, 0]}>
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
                value={period.from.month}
                onChange={handleChangeMonth}
              />
              <Input
                placeholder="Ano"
                type="number"
                min="0"
                flex="1"
                value={period.from.year}
                onChange={handleChangeYear}
              />
            </HStack>
          </Box>
        </Flex>
        <SimpleGrid gap="2" columns={[3, 4, 5, 6]} mt="2">
          <NextLink
            href={`https://api.whatsapp.com/send?phone=${data.data?.phoneNumber}`}
          >
            <IconButton aria-label="Abrir WhatsApp" icon={<FaWhatsapp />} />
          </NextLink>
          <ConfirmCallback onOk={onDelete}>
            {(onOpen) => (
              <IconButton
                aria-label="Excluir"
                onClick={onOpen}
                icon={<AiFillDelete />}
              />
            )}
          </ConfirmCallback>
        </SimpleGrid>
        <Box mt="2">
          <MultiSummary data={multiSummary.data} />
          <Box mt="4">
            <Flex justify="space-between">
              <Text fontSize="xl" fontWeight="medium" mb="2">
                Corridas
              </Text>
              {data && (
                <AddTripModal
                  initial={{ customer: data.data }}
                  onMutate={onMutate}
                >
                  {(onOpen) => (
                    <Link textAlign="right" onClick={onOpen}>
                      Adicionar corrida
                    </Link>
                  )}
                </AddTripModal>
              )}
            </Flex>
            <SimpleGrid columns={[1, 2, 3, 4]} gap="4">
              {trips.data?.pages
                .map((p) => p.values)
                .flat()
                .map((trip) => (
                  <CustomerTripCard
                    key={trip.id}
                    data={trip}
                    onMutate={onMutate}
                    onPay={() => pay(trip.id)}
                    onUnPay={() => unPay(trip.id)}
                  />
                ))}
            </SimpleGrid>
            <Center py="4">
              <Button
                onClick={() => trips.fetchNextPage()}
                disabled={!trips.hasNextPage}
              >
                Carregar mais
              </Button>
            </Center>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function CustomerSlug() {
  const router = useRouter();
  const id = Number(router.query.id);

  if (!id || isNaN(id)) return <></>;

  return (
    <Container maxWidth="container.xl">
      <CustomerPage id={id} />
    </Container>
  );
}

export default CustomerSlug;
