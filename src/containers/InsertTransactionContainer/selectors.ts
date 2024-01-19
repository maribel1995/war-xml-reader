import { useMemo, useState } from "react";
import {InsertTransactionsState} from './interfaces'

export function useSelectors() {
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [file, setFile] = useState(null);
  const [fileTransactions, setFileTransactions] =
    useState<InsertTransactionsState["fileTransactions"]>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successInsertion, setSuccessInsertion] = useState(false);
  const [fileTransactionEntity, setFileTransactionEntity] =
    useState<InsertTransactionsState["fileTransactionEntity"]>(null);

  const rows = useMemo(() => {
    if (!fileTransactions || !fileTransactionEntity) return [];
    return Object.entries(fileTransactions).map(([key, transactions]) => {
      console.log({transactions})
      const file = fileTransactionEntity[key];
      const resp = {
        cpf: file.cpf,
        accessKey: key,
        value: file.totalValue,
        date: file.date,
        id:key,
      };
      if (!transactions.length) {
        return {
            ...resp,
            collected: true,
            error: false,
            transactionId: "",
          };
      }
      
      const foundTransaction = transactions.find(
        (transaction) => Number(transaction.VALOR) === Number(file.totalValue)
      );

      if (!foundTransaction) {
        return {
          ...resp,
          collected: true,
          error: true,
          transactionId: "",
        };
      }

      return {
        ...resp,
        collected: false,
        error: false,
        transactionId: foundTransaction.id,
      };
    });
  }, [fileTransactions, fileTransactionEntity]);

  return {
    date,
    setDate,
    file,
    setFile,
    fileTransactions,
    setFileTransactions,
    rowSelectionModel,
    setRowSelectionModel,
    isLoading,
    setIsLoading,
    successInsertion,
    setSuccessInsertion,
    fileTransactionEntity,
    setFileTransactionEntity,
    rows,
  };
}
