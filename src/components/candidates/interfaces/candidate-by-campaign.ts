export interface CandidateByCampaign {
  campaignId:      string;
  title:           string;
  description:     string;
  isVotingEnabled: boolean;
  candidates:      Candidate[];
}

export interface Candidate {
  candidateid: string;
  fullName:    string;
  description: string;
  votesCount:  number;
}
