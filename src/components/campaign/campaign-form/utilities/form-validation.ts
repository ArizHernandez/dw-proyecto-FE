import * as Yup from "yup";

export const CampaignSchema = Yup.object().shape({
  title: Yup.string().required("El título es requerido"),
  description: Yup.string().required("La descripción es requerida"),
});
