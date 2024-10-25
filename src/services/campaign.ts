import { Campaign } from "../components/campaign/campaign-card/interfaces/campaign.interface";
import { CampaignPayload } from "../components/campaign/campaign-form/interface/campaign-form";
import { api } from "../helper/http-instance";

export const getCampaigns = async () => {
  return api.get<Campaign[]>("/campaign");
};

export const getCampaign = async (id: string) => {
  return api.get<Campaign>(`/campaign/${id}`);
};

export const createCampaign = async (payload: CampaignPayload) => {
  return api.post("/campaign", payload);
};

export const updateCampaign = async (id: string, payload: CampaignPayload) => {
  return api.put(`/campaign/${id}`, payload);
};
