import { useQuery } from "react-query";
import { CustomerPendingSummary } from "../util/apiResponse";
import { useApi } from "./api";

export const useCustomerPendingSummary = (id: number) => {
  const { api } = useApi();

  return useQuery(["/trips/customer/", id, "/pending-summary"], () =>
    api
      .get(`/trips/customer/${id}/pending-summary`)
      .then((response) => response.data as CustomerPendingSummary)
  );
};
