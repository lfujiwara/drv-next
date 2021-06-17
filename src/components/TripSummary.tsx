import { Box, BoxProps, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { formatCurrency } from "../util/currency";
import { formatDistance } from "../util/distance";

const MotionBox = motion<BoxProps>(Box);

function DisplayBox({ children }: { children: any }) {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      p="4"
      border="1px"
      borderColor="gray.200"
      rounded="md"
      shadow="md"
    >
      {children}
    </MotionBox>
  );
}

function TripSummary({
  data,
}: {
  data?: {
    count: number;
    fareSum: number;
    fareAvg: number;
    distanceAvg: number;
    distanceSum: number;
  };
}) {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap="4">
      <AnimatePresence>
        <DisplayBox key="corridas">
          <Text>Corridas</Text>
          <Skeleton isLoaded={!!data}>
            <Text fontSize="lg" fontWeight="medium" textAlign="center">
              {data?.count}
            </Text>
          </Skeleton>
        </DisplayBox>
        <DisplayBox key="tarifa">
          <Text>Tarifa</Text>
          <Box fontSize="lg" fontWeight="medium" textAlign="center">
            <Text>Total</Text>
            <Skeleton isLoaded={!!data}>
              <Text>{formatCurrency(data?.fareSum)}</Text>
            </Skeleton>
          </Box>
          <Box mt="2" fontSize="sm" color="gray.500" textAlign="center">
            <Text>Média</Text>
            <Skeleton isLoaded={!!data}>
              <Text>{formatCurrency(data?.fareAvg)}</Text>
            </Skeleton>
          </Box>
        </DisplayBox>
        <DisplayBox key="distância">
          <Text>Distância</Text>
          <Box fontSize="lg" fontWeight="medium" textAlign="center">
            <Text>Total</Text>
            <Skeleton isLoaded={!!data}>
              <Text>{formatDistance(data?.distanceSum)}</Text>
            </Skeleton>
          </Box>
          <Box mt="2" fontSize="sm" color="gray.500" textAlign="center">
            <Text>Média</Text>
            <Skeleton isLoaded={!!data}>
              <Text>{formatDistance(data?.distanceAvg)}</Text>
            </Skeleton>
          </Box>
        </DisplayBox>
      </AnimatePresence>
    </SimpleGrid>
  );
}

export default TripSummary;
