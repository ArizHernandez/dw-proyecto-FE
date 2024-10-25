import { CandidatePayload } from "../components/candidates/candidate-form/interface/campaign-form";
import { CandidateByCampaign } from "../components/candidates/interfaces/candidate-by-campaign";
import { api } from "../helper/http-instance";

export const getCandidatesByCampaign = async (campaignId: string) => {
  return api.get<CandidateByCampaign>(`/candidates/by-campaign/${campaignId}`);
};

export const createCandidate = async (payload: CandidatePayload) => {
  return api.post("/candidates", payload);
}

export const updateCandidate = async (id: string, payload: CandidatePayload) => {
  return api.put(`/candidates/${id}`, payload);
}