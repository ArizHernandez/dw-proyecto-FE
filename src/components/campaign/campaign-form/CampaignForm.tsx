import { Button } from "@nextui-org/button";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

import { InputField } from "../../../ui";
import { TextAreaField } from "../../../ui/TextAreaField";
import { CampaignPayload } from "./interface/campaign-form";
import { CampaignSchema } from "./utilities/form-validation";
import {
  createCampaign,
  getCampaign,
  updateCampaign,
} from "../../../services/campaign";
import { useEffect } from "react";

type Params = {
  onClose: (reloadInformation: boolean) => void;
  idCampaign?: string | null;
};

export const CampaignForm = ({ onClose, idCampaign }: Params) => {
  const handleSubmit = async (values: CampaignPayload) => {
    try {
      if (idCampaign) {
        await updateCampaign(idCampaign, values);
        toast.success("Campaña modificada exitosamente");
      } else {
        await createCampaign(values);
        toast.success("Campaña creada exitosamente");
      }

      onClose(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error.message);
    }
  };

  const loadCampaignInfo = async (setValues: any) => {
    if (!idCampaign) return;

    try {
      const { data: campaign } = await getCampaign(idCampaign);
      setValues({
        title: campaign.title || "",
        description: campaign.description || "",
        isvotingenabled: campaign.isvotingenabled ?? true,
      });
    } catch (error) {
      toast.error("Error al cargar la campaña");
    }
  };

  return (
    <>
      <Formik
        initialValues={{ title: "", description: "", isvotingenabled: true }}
        validationSchema={CampaignSchema}
        onSubmit={handleSubmit}
      >
        {({ setValues }) => {
          useEffect(() => {
            if (!idCampaign) return;

            loadCampaignInfo(setValues);
          }, [idCampaign, setValues]);
          return (
            <Form>
              <ModalHeader className="flex flex-col gap-1">
                {idCampaign ? "Edición" : "Creación"} {""}
                de campaña
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2">
                  <InputField name="title" type="text" label="Titulo" />
                </div>

                <div className="space-y-2">
                  <TextAreaField
                    name="description"
                    type="text"
                    label="Descripción"
                  />
                </div>

                {idCampaign && (
                  <Field name="isvotingenabled">
                    {({
                      field,
                      form: { setFieldValue },
                    }: {
                      field: {
                        name: string;
                        value: any;
                      };
                      form: {
                        setFieldValue: (
                          field: string,
                          value: any,
                          shouldValidate?: boolean
                        ) => void;
                      };
                    }) => (
                      <Button
                        onClick={() => setFieldValue(field.name, !field.value)}
                        color={field.value ? "danger" : "success"}
                        className="w-full"
                        type="button"
                      >
                        {field.value ? "Cerrar votaciones" : "Abrir votaciones"}
                      </Button>
                    )}
                  </Field>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={() => onClose(false)}
                >
                  Close
                </Button>
                <Button color="primary" type="submit">
                  {idCampaign ? "Guardar" : "Crear"}
                </Button>
              </ModalFooter>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
