export interface InsertTransactionsState {
  fileTransactions: Record<
    string,
    { id: string; CPF: string; VALOR: string }[]
  > | null;
  fileTransactionEntity: Record<
    string,
    {
      id: string;
      document: string;
      date: Date;
      totalValue: string;
      cpf: string;
    }
  > | null;
}

export interface InsertTransactionsProps {
  accessToken: string;
}
