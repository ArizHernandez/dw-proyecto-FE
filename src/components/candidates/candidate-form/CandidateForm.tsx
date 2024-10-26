import { Button } from "@nextui-org/button";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";

import { useEffect } from "react";
import { createCandidate, updateCandidate } from "../../../services/candidates";
import { InputField } from "../../../ui";
import { TextAreaField } from "../../../ui/TextAreaField";
import { Candidate } from "../interfaces/candidate-by-campaign";
import { CandidatePayload } from "./interface/campaign-form";
import { CandidateSchema } from "./utilities/form-validation";

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
        toast.success("Candidato modificada exitosamente");
      } else {
        await createCandidate(values);
        toast.success("Candidato creada exitosamente");
      }

      onClose(true);
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
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            setValues({
              fullname: "",
              description: "",
              campaignid: +idCampaign!,
            });

            if (!candidate) return;

            setValues({
              fullname: candidate.fullName,
              description: candidate.description,
              campaignid: +idCampaign!,
            });
          }, [setValues]);
          return (
            <Form>
              <ModalHeader className="flex flex-col gap-1">
                {candidate ? "Edición" : "Creación"} {""}
                de candidato
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
