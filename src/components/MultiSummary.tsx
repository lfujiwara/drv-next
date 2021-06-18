import {
  Box,
  BoxProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MultiTripSummary } from "../util/apiResponse";
import TripSummary from "./TripSummary";

const options = [
  { name: "Total", fn: (x: MultiTripSummary) => x.total },
  { name: "Pago", fn: (x: MultiTripSummary) => x.paid },
  { name: "Pendente", fn: (x: MultiTripSummary) => x.unpaid },
];

export const MultiSummary = ({
  data,
  ...boxProps
}: { data?: MultiTripSummary } & BoxProps) => {
  return (
    <Box {...boxProps}>
      <Text fontSize="xl" fontWeight="medium" mb="2">
        Relatório
      </Text>
      <Tabs variant="enclosed">
        <TabList>
          {options.map((opt) => (
            <Tab key={opt.name}>{opt.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {options.map((opt) => (
            <TabPanel key={opt.name}>
              <TripSummary data={data && opt.fn(data)} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
