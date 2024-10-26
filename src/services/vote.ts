import { api } from "../helper/http-instance";

export const sendVoteToCandidate = async (payload: {
  candidateid: string;
  campaignid: number;
}) => {
  return api.post(`/votes`, payload);
};
