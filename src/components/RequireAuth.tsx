import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { ApiContextProvider } from "../hooks/api";

const RequireAuthInner: React.FC = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    if (!isLoading) loginWithRedirect();
    return <></>;
  }

  return <>{children}</>;
};

export const RequireAuth: React.FC = ({ children }) => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH_DOMAIN + ""}
      clientId={process.env.NEXT_PUBLIC_AUTH_CLIENTID + ""}
      redirectUri={process.env.NEXT_PUBLIC_AUTH_REDIRECTURI + ""}
      audience={process.env.NEXT_PUBLIC_AUTH_AUDIENCE + ""}
    >
      <ApiContextProvider>
        <RequireAuthInner>{children}</RequireAuthInner>
      </ApiContextProvider>
    </Auth0Provider>
  );
};
