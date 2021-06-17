import { endOfMonth } from "date-fns";

export type PickedMonth = { month: any; year: any };
export const makePeriodParams = ({
  from,
  to,
}: {
  from: PickedMonth;
  to: PickedMonth;
}) => {
  const fromDate = new Date(from.year, from.month - 1);
  const toDate = endOfMonth(new Date(to.year, to.month - 1));

  return {
    from: fromDate.toISOString(),
    to: toDate.toISOString(),
  };
};
