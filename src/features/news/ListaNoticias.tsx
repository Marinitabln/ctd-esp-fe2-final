import { ListaNoticias, } from "./styled"
import { INoticiasNormalizadas } from "./types";
import { CardNoticia } from "./TarjetaNoticia";


interface IProps {
    noticias: INoticiasNormalizadas[]
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}

export const ListadoNoticias = ({ noticias, setModal }: IProps) => {
    return (
        <ListaNoticias>
            {noticias.map((noticia) => (
                <CardNoticia noticia={noticia} setModal={setModal}/>
                ))}
        </ListaNoticias>
    )
}