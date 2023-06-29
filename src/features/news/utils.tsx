import { obtenerNoticias, INoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "./types";



export const obtenerInformacion = async (setNoticias:React.Dispatch<React.SetStateAction<INoticiasNormalizadas[]>>) => {
    const respuesta = await obtenerNoticias();
    const data = respuesta.map((noticia) => {
        return normalizarNoticia(noticia)
    });
    setNoticias(data);
};

const normalizarNoticia = (noticia: INoticias) => {
    const titulo = normalizarTitulo(noticia.titulo);
    const minutosTranscurridos = calcularMinutos(noticia);
    const fecha = `Hace ${minutosTranscurridos} minutos`;
    const descripcionCorta = noticia.descripcion.substring(0, 100);
    return {
        id: noticia.id,
        titulo,
        descripcion: noticia.descripcion,
        fecha,
        esPremium: noticia.esPremium,
        imagen: noticia.imagen,
        descripcionCorta
    };
}

export const normalizarTitulo = (titulo: String) => {
    return titulo
        .split(" ")
        .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        })
        .join(" ");
}

export const calcularMinutos = (noticia: INoticias) => {
    const ahora = new Date();
    return (Math.floor(
        (ahora.getTime() - noticia.fecha.getTime()) / 60000
    ))
}

