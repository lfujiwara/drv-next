import { Box } from "@chakra-ui/react";
import React from "react";
import NavBar from "./NavBar";

function Layout({ children }: { children: any }) {
  return (
    <Box>
      <NavBar />
      {children}
    </Box>
  );
}

export default Layout;
