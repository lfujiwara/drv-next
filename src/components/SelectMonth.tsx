import { As, OmitCommonProps, Select, SelectProps } from "@chakra-ui/react";
import { startOfMonth } from "date-fns";
import React from "react";

const getMonthName = (n: number) => {
  const date = startOfMonth(new Date());
  date.setMonth(n);
  const month = date.toLocaleString("pt-BR", { month: "long" });

  return month.slice(0, 1).toLocaleUpperCase() + month.slice(1);
};

function SelectMonth(
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<
      React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >,
      keyof SelectProps
    > &
    SelectProps &
    OmitCommonProps<any, keyof SelectProps> & { as?: As<any> | undefined }
) {
  return (
    <Select placeholder="Mês" flex="2" {...props}>
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <option value={i + 1} key={i + 1}>
            {getMonthName(i)}
          </option>
        ))}
    </Select>
  );
}

export default SelectMonth;
