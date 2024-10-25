import { useCallback, useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CandidateForm } from "../../../components/candidates/candidate-form/CandidateForm";
import {
  Candidate,
  CandidateByCampaign,
} from "../../../components/candidates/interfaces/candidate-by-campaign";
import { getCandidatesByCampaign } from "../../../services/candidates";
import { CandidateCard } from "../../../components/candidates/candidate-card/CandidateCard";

export const CampaignPage = () => {
  const [campaign, setCampaign] = useState<CandidateByCampaign | null>(null);
  const [candidateSelected, setCandidateSelected] = useState<Candidate | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const { id } = useParams();

  const loadCampaign = useCallback(async () => {
    try {
      const { data } = await getCandidatesByCampaign(id!);

      setCampaign(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error.message);
    }
  }, [id]);

  const handleClose = (onClose: () => void, realodInfo: boolean) => {
    setCandidateSelected(null);

    if (realodInfo) {
      loadCampaign();
    }

    onClose();
  };

  useEffect(() => {
    loadCampaign();
  }, [loadCampaign]);

  return (
    <section className="container mx-auto">
      <Button className="mb-4" onClick={() => navigate("/campaign")}>
        {"<"} Regresar
      </Button>
      <div className="flex gap-4 flex-col md:flex-row">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://pbc712.org/wp-content/uploads/2020/08/vote-for-blog.jpg"
          width="500"
        />
        <div>
          <Chip color={campaign?.isVotingEnabled ? "success" : "danger"}>
            {campaign?.isVotingEnabled ? "Activa" : "Cerrada"}
          </Chip>
          <h1 className="text-2xl font-bold">{campaign?.title}</h1>
          <p>{campaign?.description}</p>
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <Button onPress={onOpen}>Agregar candidato</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {campaign?.candidates.map((candidate) => (
          <CandidateCard
            key={candidate.candidateid}
            name={candidate.fullName}
            description={candidate.description}
            votes={candidate.votesCount}
            id={candidate.candidateid}
          />
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <CandidateForm
              onClose={(reloadInformation) =>
                handleClose(onClose, reloadInformation)
              }
              idCampaign={id}
              candidate={candidateSelected}
            />
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};
