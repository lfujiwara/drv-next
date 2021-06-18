import { TripData } from "../util/apiResponse";
import { useApi } from "./api";

export const useTripPayment = ({ onMutate }: { onMutate?: () => any }) => {
  const { api } = useApi();

  const pay = (id: number) =>
    api.put(`/trips/${id}/pay`).then((res) => {
      onMutate && onMutate();
      return res.data as TripData;
    });
  const unPay = (id: number) =>
    api.put(`/trips/${id}/unpay`).then((res) => {
      onMutate && onMutate();
      return res.data as TripData;
    });

  return { pay, unPay };
};
