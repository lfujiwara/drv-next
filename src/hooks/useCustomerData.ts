import { useInfiniteQuery, useQuery } from "react-query";
import {
  CustomerData,
  MultiTripSummary,
  Paged,
  TripData,
  TripSummary,
} from "../util/apiResponse";
import { makePeriodParams } from "../util/dateRanges";
import { useApi } from "./api";
import { useDateRange } from "./useDateRange";

export const useCustomerData = (id: number) => {
  const { api } = useApi();

  const { period, setPeriod } = useDateRange();

  const data = useQuery(["/customers/", id], () =>
    api
      .get(`/customers/${id}`)
      .then((response) => response.data as CustomerData)
  );

  const summary = useQuery(["/trips/customer/", id, "/summary", period], () =>
    api
      .get(`/trips/customer/${id}/summary`, {
        params: makePeriodParams(period),
      })
      .then((response) => response.data as TripSummary)
  );

  const multiSummary = useQuery(
    ["/trips/customer/", id, "/multi-summary", period],
    () =>
      api
        .get(`/trips/customer/${id}/multi-summary`, {
          params: makePeriodParams(period),
        })
        .then((response) => response.data as MultiTripSummary)
  );

  const trips = useInfiniteQuery(
    ["/trips/customer/", id, period],
    ({ pageParam: { skip, take } = { skip: 0, take: 15 } }) =>
      api
        .get(`/trips/customer/${id}`, {
          params: { skip, take, ...makePeriodParams(period) },
        })
        .then((response) => response.data as Paged<TripData>),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.values.length === lastPage.take)
          return { skip: lastPage.skip + lastPage.take, take: lastPage.take };
      },
    }
  );

  return { period, setPeriod, data, summary, multiSummary, trips };
};
