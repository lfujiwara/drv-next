import { useQuery } from "react-query";
import { TripSummary } from "../util/apiResponse";
import { makePeriodParams } from "../util/dateRanges";
import { useApi } from "./api";
import { useDateRange } from "./useDateRange";

export const useQueryTripSummary = () => {
  const { api } = useApi();
  const { period, setPeriod } = useDateRange();

  const query = useQuery(["/trips", period, "/summary"], () =>
    api
      .get("/trips/summary", {
        params: makePeriodParams(period),
      })
      .then((response) => response.data as TripSummary)
  );

  return { period, setPeriod, query };
};
