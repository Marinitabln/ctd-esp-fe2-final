import { ContenedorModal, TarjetaModal, CloseButton, ImagenModal, CotenedorTexto, TituloModal, DescripcionModal} from "./styled"
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { INoticiasNormalizadas } from "./types";
import { BtnSuscribir } from "./BotonSuscribir";

interface IProps {
    noticiaSeleccionada: INoticiasNormalizadas | null
    setNoticiaSeleccionada: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>
}

export const CardModal = ({noticiaSeleccionada, setNoticiaSeleccionada}:IProps)=>{
    const tituloPremium = "Suscríbete a nuestro Newsletter"
    const descripcionPremium = "Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos."

    return(
        <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => setNoticiaSeleccionada(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={noticiaSeleccionada?.esPremium? SuscribeImage : noticiaSeleccionada?.imagen} alt="mr-burns-excelent" />
                <CotenedorTexto>
                  <TituloModal>{noticiaSeleccionada?.esPremium? tituloPremium : noticiaSeleccionada?.titulo}</TituloModal>
                  <DescripcionModal>
                  {noticiaSeleccionada?.esPremium? descripcionPremium : noticiaSeleccionada?.descripcion}
                  </DescripcionModal>
                  {noticiaSeleccionada?.esPremium && <BtnSuscribir setNoticia={setNoticiaSeleccionada} />}
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
    )
}