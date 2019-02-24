export class ProposalLabel{
  id: number;
  name: string;
}

export class Proposal {
  trello_id: string;
  trello_name: string;
  customer: string;
  release_date: string;
  version: number;
  path: string;
  labels: ProposalLabel[];
}

export class ProposalTrello{
  trello_id: number;
  trello_name: string;
  customer: string;
  labels: ProposalLabel[];
}