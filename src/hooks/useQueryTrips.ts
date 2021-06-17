import { useInfiniteQuery } from "react-query";
import { CustomerData, Paged, TripData } from "../util/apiResponse";
import { makePeriodParams } from "../util/dateRanges";
import { useApi } from "./api";
import { useDateRange } from "./useDateRange";

export const useQueryTrips = (pageSize = 15) => {
  const { api } = useApi();
  const { period, setPeriod } = useDateRange();

  const query = useInfiniteQuery(
    ["/trips", period],
    ({ pageParam: { skip, take } = { skip: 0, take: pageSize } }) =>
      api
        .get("/trips", {
          params: { skip, take, ...makePeriodParams(period) },
        })
        .then(
          (response) =>
            response.data as Paged<TripData & { customer: CustomerData }>
        ),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.values.length === lastPage.take)
          return { skip: lastPage.skip + lastPage.take, take: lastPage.take };
      },
    }
  );

  return { period, setPeriod, query };
};
