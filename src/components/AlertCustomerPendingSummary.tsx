import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { CustomerPendingSummary } from "../util/apiResponse";
import { formatCurrency } from "../util/currency";

const dateFormatter = Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const monthFormatter = Intl.DateTimeFormat("pt-BR", {
  year: "numeric",
  month: "short",
});

const formatMonth = (s: string) => monthFormatter.format(new Date(s));

export const AlertCustomerPendingSummary: FC<
  { data: CustomerPendingSummary } & AlertProps
> = ({ data, ...alertProps }) => {
  if (data.count == 0)
    return (
      <Alert status="success" rounded="md" {...alertProps}>
        <AlertIcon />
        <AlertTitle mr={2}>Nenhuma pendência encontrada</AlertTitle>
      </Alert>
    );

  return (
    <Alert status="warning" rounded="md" {...alertProps}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle mr={2}>Pendências encontradas</AlertTitle>
        <AlertDescription>
          <Text>
            Existem {data.count} corridas pendentes, no valor total de{" "}
            {formatCurrency(data.total)}, desde{" "}
            {dateFormatter.format(new Date(data.from))}.
          </Text>
          {(data.monthsWithPendingTrips.length <= 12 && (
            <Text>
              Meses com pendências:{" "}
              {data.monthsWithPendingTrips
                .map((m) => formatMonth(m))
                .join(", ")}
            </Text>
          )) || (
            <Accordion allowMultiple mt="2">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Meses com pendências
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {data.monthsWithPendingTrips
                    .map((m) => formatMonth(m))
                    .join(", ")}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </AlertDescription>
      </Box>
    </Alert>
  );
};
