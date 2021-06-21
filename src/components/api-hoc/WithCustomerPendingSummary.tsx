import { FC } from "react";
import { UseQueryResult } from "react-query";
import { useCustomerPendingSummary } from "../../hooks/useCustomerPendingSummary";
import { CustomerPendingSummary } from "../../util/apiResponse";

export const WithCustomerPendingSummary: FC<{
  id: number;
  children: (q: UseQueryResult<CustomerPendingSummary, unknown>) => any;
}> = ({ id, children }) => {
  const pendingSummary = useCustomerPendingSummary(id);
  return <>{children(pendingSummary)}</>;
};
