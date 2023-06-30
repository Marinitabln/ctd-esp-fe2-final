import { useEffect, useState } from "react";
import {
  ContenedorNoticias,
  TituloNoticias
} from "./styled";
import { INoticiasNormalizadas } from "./types";
import { obtenerInformacion } from "./utils";
import { ListadoNoticias } from "./ListaNoticias";
import { CardModal } from "./TarjetaModal";

// Implementación de principio Single Responsability - SOLID 
// El proceso de refactorización se llevó a cabo siguiendo este principio, atomizando las funcionalidades en diferentes componentes, y permitiendo que el componente Noticias se encargue unicamente de renderizar las mismas. 

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
      {modal ? (<CardModal noticiaSeleccionada={modal} setNoticiaSeleccionada={setModal} />
      ) : null}
    </ContenedorNoticias>
  );
};

export default Noticias;
