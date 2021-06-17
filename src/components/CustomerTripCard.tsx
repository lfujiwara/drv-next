import {
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Skeleton,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaMapMarkerAlt, FaRegCircle } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { useApi } from "../hooks/api";
import { CustomerData } from "../util/apiResponse";
import { formatCurrency } from "../util/currency";
import { formatDistance } from "../util/distance";
import ConfirmCallback from "./ConfirmCallback";
import CustomerCard from "./CustomerCard";

const MotionFlex = motion<FlexProps>(Flex);
const dateFormatter = Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export default function CustomerTripCard({
  data,
  onMutate,
}: {
  data?: {
    id: number;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    fare: number;
    obs: string;
    customer?: CustomerData;
  };
  onMutate?: () => any;
}) {
  const { api } = useApi();
  const client = useQueryClient();
  const toast = useToast();

  const deleteTrip = () =>
    api.delete(`/trips/${data?.id}`).then(() => {
      client.invalidateQueries("/trips", { exact: false });
      toast({ title: "Corrida excluída", status: "warning" });
      onMutate && onMutate();
    });

  return (
    <MotionFlex
      layout
      direction="column"
      p="4"
      border="1px"
      borderColor="gray.200"
      rounded="md"
      shadow="md"
    >
      <Flex justify="space-between" mb="2">
        <Box>
          <HStack alignItems="center">
            <Tooltip label="Origem" placement="top" hasArrow>
              <span>
                <FaRegCircle />
              </span>
            </Tooltip>
            <Skeleton isLoaded={!!data}>
              {data && <Text fontWeight="medium">{data.origin}</Text>}
            </Skeleton>
          </HStack>
          <HStack alignItems="center">
            <Tooltip label="Destino" placement="bottom" hasArrow>
              <span>
                <FaMapMarkerAlt />
              </span>
            </Tooltip>
            <Skeleton isLoaded={!!data}>
              {data && <Text fontWeight="medium">{data.destination}</Text>}
            </Skeleton>
          </HStack>
        </Box>
        {data && (
          <ConfirmCallback onOk={deleteTrip}>
            {(onOpen) => (
              <IconButton
                p="1"
                aria-label="Excluir corrida"
                icon={<AiFillDelete />}
                onClick={onOpen}
              />
            )}
          </ConfirmCallback>
        )}
      </Flex>
      <Box>
        <Skeleton isLoaded={!!data}>
          {data && <Text>{dateFormatter.format(new Date(data.date))}</Text>}
        </Skeleton>
      </Box>
      <HStack justify="space-around" mt="2">
        <Box textAlign="center">
          <Text fontWeight="medium">Tarifa</Text>
          <Skeleton isLoaded={!!data}>
            {data && <Text>{formatCurrency(data.fare)}</Text>}
          </Skeleton>
        </Box>
        <Box textAlign="center">
          <Text fontWeight="medium">Distância</Text>
          <Skeleton isLoaded={!!data}>
            {data && <Text>{formatDistance(data.distance)}</Text>}
          </Skeleton>
        </Box>
      </HStack>
      <Box mt="2">
        {data && (
          <Text
            maxH="16"
            overflowY="auto"
            fontSize="sm"
            color={!data.obs ? "gray.500" : undefined}
          >
            {data.obs && `Obs: ${data.obs}`}
          </Text>
        )}
      </Box>
      {data?.customer && (
        <Flex flex="1" direction="column" justify="flex-end" mt="2">
          <CustomerCard {...data.customer} />
        </Flex>
      )}
    </MotionFlex>
  );
}
