import { useBottomSheet } from "@/src/shared/context/UIProvider/hooks/useUI";
import { SpotDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import { ReportarFutbolinForm } from "./ReportarFutbolinForm";

export const BotonReportar = ({ futbolin }: { futbolin: SpotDTO }) => {

    const {openSheet, closeSheet} = useBottomSheet()

    const handleClickReportar = () => {
        openSheet(<ReportarFutbolinForm futbolin={futbolin} onClose={closeSheet}/>, `Reportar ${futbolin.tipoFutbolin}`)
    }

  return <Button size="sm" label="Reportar" variant="danger-outline" onClick={handleClickReportar}/>;
};
