import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  registrationnumber: Yup.string().required(
    "El número de colegiado es requerido"
  ),
  dpi: Yup.string().required("El DPI es requerido"),
  birthdate: Yup.string().required("La fecha de nacimiento es requerida"),
  password: Yup.string().required("La contraseña es requerida"),
});
