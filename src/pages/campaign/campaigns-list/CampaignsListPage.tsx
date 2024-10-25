import { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

import { CampaignCard } from "../../../components/campaign/campaign-card/CampaignCard";
import { CampaignForm } from "../../../components/campaign/campaign-form/CampaignForm";
import { AppRoles } from "../../../helper/app-roles";
import { useAuth } from "../../../hooks/useAuth";
import { getCampaigns } from "../../../services/campaign";
import { Campaign } from "../../../components/campaign/campaign-card/interfaces/campaign.interface";
import { useNavigate } from "react-router-dom";

export const CampaignsListPage = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [idCampaign, setIdCampaign] = useState<null | string>(null);

  const loadCampaigns = async () => {
    const { data: campaigns } = await getCampaigns();

    setCampaigns(campaigns);
  };

  const handleClose = (onClose: () => void, realodInfo: boolean) => {
    setIdCampaign(null);

    if (realodInfo) {
      loadCampaigns();
    }

    onClose();
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <section className="container p-2 m-auto">
      {user && user.rol === AppRoles.Admin && (
        <>
          <div className="flex justify-end">
            <Button onPress={onOpen}>Crear campaña</Button>
          </div>
        </>
      )}

      {campaigns.length > 0 ? (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.campaignid}
              title={campaign.title}
              description={campaign.description}
              status={campaign.isvotingenabled}
              onClick={() => navigate(`/campaign/${campaign.campaignid}`)}
              onEdit={() => {
                setIdCampaign(campaign.campaignid);
                onOpen();
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-3xl mt-3">No hay campañas cargadas</p>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <CampaignForm
              onClose={(reloadInformation) =>
                handleClose(onClose, reloadInformation)
              }
              idCampaign={idCampaign}
            />
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};
