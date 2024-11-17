import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DEFAULT_SUCCESS_MESSAGE = "Proceso ejecuto con éxito";
const DEFAULT_ERROR_MESSAGE = "Se ha presentado un error";
const DEFAULT_INFO_MESSAGE = "Desea cerra la sesion?";
const DEFAULT_CONFIRM_BUTTON = "Aceptar";
const DEFAULT_CANCEL_BUTTON = "Cancelar";

export const alert = {
  success: (text = DEFAULT_SUCCESS_MESSAGE) =>
    MySwal.fire({
      icon: "success",
      title: "Éxito",
      text,
      confirmButtonText: DEFAULT_CONFIRM_BUTTON,
    }),
  error: (text = DEFAULT_ERROR_MESSAGE) =>
    MySwal.fire({
      icon: "error",
      title: "Error",
      text,
      confirmButtonText: DEFAULT_CONFIRM_BUTTON,
    }),
  confirm: () => {
    return MySwal.fire({
      icon: "info",
      title: "Confirmacion",
      text: DEFAULT_INFO_MESSAGE,
      confirmButtonText: DEFAULT_CONFIRM_BUTTON,
      cancelButtonText: DEFAULT_CANCEL_BUTTON,
      showCancelButton: true,
    });
  },
};
