import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useApi } from "./api";

export const useQueryCustomers = (pageSize = 15) => {
  const { api } = useApi();

  const [q, setQ] = useState("");
  const query = useInfiniteQuery(
    ["/customers", q],
    ({ pageParam: { skip, take } = { skip: 0, take: pageSize } }) =>
      api
        .get("/customers", { params: { skip, take, q } })
        .then((response) => response.data),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.values.length === lastPage.take)
          return { skip: lastPage.skip + lastPage.take, take: lastPage.take };
      },
    }
  );

  return { query, q, setQ };
};
