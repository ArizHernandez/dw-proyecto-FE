import { Button } from "@nextui-org/button";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

import { useEffect } from "react";
import { getCampaign } from "../../../services/campaign";
import { InputField } from "../../../ui";
import { TextAreaField } from "../../../ui/TextAreaField";
import { Candidate } from "../interfaces/candidate-by-campaign";
import { CandidatePayload } from "./interface/campaign-form";
import { CandidateSchema } from "./utilities/form-validation";
import { createCandidate, updateCandidate } from "../../../services/candidates";

type Params = {
  onClose: (reloadInformation: boolean) => void;
  idCampaign?: string | null;
  candidate: Candidate | null;
};

export const CandidateForm = ({ onClose, idCampaign, candidate }: Params) => {
  const handleSubmit = async (values: CandidatePayload) => {
    try {
      if (candidate) {
        await updateCandidate(candidate.candidateid, values);
        toast.success("Campaña modificada exitosamente");
      } else {
        await createCandidate(values);
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
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          fullname: "",
          description: "",
          campaignid: +idCampaign!,
        }}
        validationSchema={CandidateSchema}
        onSubmit={handleSubmit}
      >
        {({ setValues }) => {
          useEffect(() => {
            setValues({
              fullname: "",
              description: "",
              campaignid: +idCampaign!,
            });

            if (!candidate) return;

            loadCampaignInfo(setValues);
          }, [setValues]);
          return (
            <Form>
              <ModalHeader className="flex flex-col gap-1">
                {idCampaign ? "Edición" : "Creación"} {""}
                de campaña
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2">
                  <InputField name="fullname" type="text" label="Nombre" />
                </div>

                <div className="space-y-2">
                  <TextAreaField
                    name="description"
                    type="text"
                    label="Descripción"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={() => onClose(false)}
                >
                  Cancelar
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
