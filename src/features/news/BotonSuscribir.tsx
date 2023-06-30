import { BotonSuscribir } from "./styled";
import { INoticiasNormalizadas } from "./types";

interface IProps{
    setNoticia:React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}

export const BtnSuscribir = ({setNoticia}:IProps) => {
    return (
        <BotonSuscribir
            onClick={() =>
                setTimeout(() => {
                    alert("Suscripto!");
                    setNoticia(null);
                }, 1000)
            }
        >
            Suscríbete
        </BotonSuscribir>
    )
}