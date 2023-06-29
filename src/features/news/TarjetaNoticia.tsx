import { useStore } from "react-redux"
import { TarjetaNoticia, ImagenTarjetaNoticia, TituloTarjetaNoticia, FechaTarjetaNoticia, DescripcionTarjetaNoticia, BotonLectura } from "./styled"
import { INoticiasNormalizadas } from "./types"
import { useState } from "react"

interface IProps {
    noticia: INoticiasNormalizadas,
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}

export const CardNoticia = ({ noticia, setModal }: IProps) => {
     return (
        <TarjetaNoticia>
            <ImagenTarjetaNoticia src={noticia.imagen} />
            <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
                {noticia.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
        </TarjetaNoticia>
    )
}