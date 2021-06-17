import { Box, BoxProps, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const MotionBox = motion<BoxProps>(Box);
const fadeProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function CustomerCard({
  name,
  id,
  phoneNumber,
}: {
  name: string;
  id: number;
  phoneNumber: string;
}) {
  return (
    <MotionBox
      {...fadeProps}
      layout
      p="4"
      border="1px"
      borderColor="gray.200"
      rounded="md"
      shadow="md"
    >
      <Flex alignItems="center">
        <Box>
          <NextLink href={`/customers/${id}`}>
            <Link>
              <Text fontWeight="medium" fontSize="lg">
                {name}
              </Text>
            </Link>
          </NextLink>
          <Text fontSize="sm" color="gray.500">
            {phoneNumber}
          </Text>
        </Box>
        <Flex flex="1" />
        <NextLink href={`https://api.whatsapp.com/send?phone=${phoneNumber}`}>
          <IconButton aria-label="Abrir WhatsApp" icon={<FaWhatsapp />} />
        </NextLink>
      </Flex>
    </MotionBox>
  );
}

export default CustomerCard;
