"use client";
import { DistribucionFutbolin, TipoFutbolin } from "futbol-in-core/enum";
import { CustomSelect } from "futbol-in-ui";
import { memo } from "react";

export interface SelectorDistribucionProps {
  value: DistribucionFutbolin;
  onSelect: (selectedOption: DistribucionFutbolin) => void;
  disabled?: boolean;
  incluirOpcionTodos?: boolean;
}

const SelectorDistribucion = memo((props: SelectorDistribucionProps) => {
  const {
    value,
    onSelect,
    disabled = false,
    incluirOpcionTodos = false,
  } = props;

  const futbolinOptions = [
    { value: DistribucionFutbolin.F4, label: "F4" },
    { value: DistribucionFutbolin.F5, label: "F5" },
  ];

  const options = incluirOpcionTodos
    ? [
        { value: TipoFutbolin.CUALQUIERA, label: "Cualquiera" },
        ...futbolinOptions,
      ]
    : futbolinOptions;

  return (
    <CustomSelect
      value={options.find((o) => o.value === value)}
      onSelect={(selectedOption) => {
        onSelect(selectedOption.value as DistribucionFutbolin);
      }}
      options={options}
      disabled={disabled}
    />
  );
});

SelectorDistribucion.displayName = "SelectorDistribucion";

export default SelectorDistribucion;
