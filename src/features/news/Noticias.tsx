import { useEffect, useState } from "react";
import {
  TarjetaModal,
  ContenedorNoticias,
  TituloNoticias
} from "./styled";
import { INoticiasNormalizadas } from "./types";
import { obtenerInformacion } from "./utils";
import { ListadoNoticias } from "./ListaNoticias";
import { CardModal } from "./TarjetaModal";



const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    obtenerInformacion(setNoticias);
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListadoNoticias noticias={noticias} setModal={setModal} />
      {modal ? (<CardModal noticiaSeleccionada={modal} setModal={setModal} />
      ) : null}
    </ContenedorNoticias>
  );
};

export default Noticias;
