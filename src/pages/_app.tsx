import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";
import { RequireAuth } from "../components/RequireAuth";
import "../main.css";

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
      <RequireAuth>
        <QueryClientProvider client={new QueryClient()}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </RequireAuth>
    </ChakraProvider>
  );
}

export default MyApp;
