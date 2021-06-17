import React from "react";
import "../main.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";
import { ApiContextProvider } from "../hooks/api";

const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
  },
});

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <ApiContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApiContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
