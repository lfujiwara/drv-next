import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";

const options: { name: string; href: string; icon: any }[] = [];
const makeOption = (name: string, href: string, icon: any) =>
  options.push({ name, href, icon });

makeOption("Clientes", "/customers", <IoPeople />);

function NavBar() {
  const { pathname } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const menuOptions = options.map((opt) => (
    <Link as={NextLink} key={opt.href} href={opt.href}>
      <Text
        cursor="pointer"
        fontWeight={pathname === opt.href ? "bold" : "unset"}
        _hover={{ textDecoration: "underline" }}
        p="2"
      >
        {opt.name}
      </Text>
    </Link>
  ));

  const MenuGrid = (
    <SimpleGrid gap="2" columns={[1, options.length]}>
      {menuOptions}
    </SimpleGrid>
  );

  const MenuBtn = (
    <IconButton
      aria-label="abrir menu"
      ref={btnRef}
      onClick={onOpen}
      icon={<GiHamburgerMenu />}
    />
  );

  const menu = useBreakpointValue([MenuBtn, MenuGrid]);

  return (
    <Flex p="2" alignItems="center">
      <NextLink href="/">
        <Link as={Text} _hover={{}} fontSize="xl" fontWeight="bold">
          DRV
        </Link>
      </NextLink>
      <Box flex="1" />
      {menu}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box>
            <DrawerCloseButton />
          </Box>
          <DrawerBody mt="8">
            <Flex alignItems="flex-end" direction="column">
              {menuOptions}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default NavBar;
