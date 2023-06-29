import { ContenedorModal, TarjetaModal, CloseButton, ImagenModal, CotenedorTexto, TituloModal, DescripcionModal, BotonSuscribir } from "./styled"
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { INoticiasNormalizadas } from "./types";

interface IProps {
    noticiaSeleccionada: INoticiasNormalizadas | null
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}

export const CardModal = ({noticiaSeleccionada, setModal}:IProps)=>{
    const tituloPremium = "Suscríbete a nuestro Newsletter"
    const descripcionPremium = "Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos."

    return(
        <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={noticiaSeleccionada?.esPremium? SuscribeImage : noticiaSeleccionada?.imagen} alt="mr-burns-excelent" />
                <CotenedorTexto>
                  <TituloModal>{noticiaSeleccionada?.esPremium? tituloPremium : noticiaSeleccionada?.titulo}</TituloModal>
                  <DescripcionModal>
                  {noticiaSeleccionada?.esPremium? descripcionPremium : noticiaSeleccionada?.descripcion}
                  </DescripcionModal>
                  {noticiaSeleccionada?.esPremium && <BotonSuscribir
                    onClick={() =>
                      setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                      }, 1000)
                    }
                  >
                    Suscríbete
                  </BotonSuscribir>}
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
    )
}