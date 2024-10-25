import * as Yup from "yup";

export const CandidateSchema = Yup.object().shape({
  fullname: Yup.string().required("El nombre es requerido"),
  description: Yup.string().required("La descripción es requerida"),
});
