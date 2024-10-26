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
import { sendVoteToCandidate } from "../../../services/vote";
import { useAuth } from "../../../hooks/useAuth";
import { AppRoles } from "../../../helper/app-roles";

export const CampaignPage = () => {
  const [campaign, setCampaign] = useState<CandidateByCampaign | null>(null);
  const [candidateSelected, setCandidateSelected] = useState<Candidate | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  const voteToCandidate = async (candidateId: string) => {
    try {
      await sendVoteToCandidate({ candidateid: candidateId, campaignid: +id! });

      toast.success("Voto realizado correctamente");
      loadCampaign();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error.message);
    }
  };

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
    <section className="container mx-auto mb-2">
      <Button className="mb-4" onClick={() => navigate("/campaign")}>
        {"<"} Regresar
      </Button>
      <div className="flex gap-4 flex-col md:flex-row">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://pbc712.org/wp-content/uploads/2020/08/vote-for-blog.jpg"
          width="450"
        />
        <div>
          <Chip color={campaign?.isVotingEnabled ? "success" : "danger"}>
            {campaign?.isVotingEnabled ? "Activa" : "Cerrada"}
          </Chip>
          <h1 className="text-2xl font-bold">{campaign?.title}</h1>
          <p>{campaign?.description}</p>
        </div>
      </div>

      {campaign?.isVotingEnabled && user?.rol === AppRoles.Admin && (
        <div className="flex justify-end mt-2">
          <Button onPress={onOpen}>Agregar candidato</Button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mt-2">
        {campaign?.candidates.map((candidate) => (
          <CandidateCard
            key={candidate.candidateid}
            name={candidate.fullName}
            isVotingEnabled={campaign.isVotingEnabled}
            description={candidate.description}
            votes={candidate.votesCount}
            id={candidate.candidateid}
            onClick={() => {
              setCandidateSelected(candidate);
              onOpen();
            }}
            onVote={() => {
              voteToCandidate(candidate.candidateid);
            }}
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
