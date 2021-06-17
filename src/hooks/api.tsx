import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { createContext, useContext } from "react";

const makeAxios = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

export const ApiContext = createContext({
  api: makeAxios(),
});

export const ApiContextProvider = ({ children }: { children: any }) => {
  const { getAccessTokenSilently } = useAuth0();
  const _axios = makeAxios();

  _axios.interceptors.request.use(async (req) => {
    const token = await getAccessTokenSilently();
    req.headers.authorization = `Bearer ${token}`;
    return req;
  });

  return (
    <ApiContext.Provider value={{ api: _axios }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
