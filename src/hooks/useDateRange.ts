import { endOfMonth } from "date-fns";
import { useState } from "react";

export const useDateRange = () => {
  const date = endOfMonth(new Date());
  const [period, setPeriod] = useState<{
    from: {
      month: number;
      year: number | string;
    };
    to: {
      month: number;
      year: number | string;
    };
  }>({
    from: {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    },
    to: {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    },
  });

  return { period, setPeriod };
};
