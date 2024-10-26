import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  registrationnumber: Yup.string().required(
    "El número de colegiado es requerido"
  ),
  fullname: Yup.string().required("El nombre completo es requerido"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es requerido"),
  dpi: Yup.string().required("El DPI es requerido").length(13, "DPI inválido, debe tener 13 dígitos"),
  birthdate: Yup.string().required("La fecha de nacimiento es requerida"),
  password: Yup.string().required("La contraseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("La confirmación de la contraseña es requerida"),
});
