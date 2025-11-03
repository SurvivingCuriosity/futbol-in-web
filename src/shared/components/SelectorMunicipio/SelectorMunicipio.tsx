"use client";

import { CustomAsyncSelect, OptionType } from "futbol-in-ui";
import { useCallback } from "react";
import { MapsClient } from "./fetchMunicipios";

type Props = {
  value?: OptionType & {subLabel:string};
  onSelect: (selectedOption: OptionType) => void;
  disabled?: boolean;
};

export const SelectorMunicipio = ({ value, onSelect, disabled }: Props) => {
  const loadOptions = useCallback(
    async (inputValue: string|number): Promise<OptionType[]> => {
      const res = await MapsClient.searchMunicipio(String(inputValue));
      return res.map((m:OptionType & {subLabel:string}) => ({
        label: m.label,
        subLabel: m.subLabel,
        value: m.value,
      }));
    },
    []
  );

  return (
    <CustomAsyncSelect
      value={value}
      onSelect={onSelect}
      loadOptions={loadOptions}
      placeholder="Buscar municipio..."
      disabled={disabled}
      renderOption={(o: OptionType) => (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-800">
          <p className="text-neutral-200">{o.label}</p>
          {/* @ts-expect-error sublabel no definido en el tipo */}
          <p className="text-xs text-neutral-500 uppercase">{o.subLabel}</p>
        </div>
      )}
    />
  );
};
