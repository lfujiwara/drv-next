import axios from "axios";
import { createContext, useContext } from "react";

const makeAxios = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

export const ApiContext = createContext({
  api: makeAxios(),
  pushToken: () => {},
});

export const ApiContextProvider = ({ children }: { children: any }) => {
  const _axios = makeAxios();
  let tokenInterceptorId: number | undefined;
  const pushToken = (token: string) => {
    if (tokenInterceptorId)
      _axios.interceptors.request.eject(tokenInterceptorId);

    tokenInterceptorId = _axios.interceptors.request.use((req) => {
      req.headers.authorization = `Bearer ${token}`;
      return req;
    });
  };

  return (
    <ApiContext.Provider value={{ api: _axios, pushToken }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
