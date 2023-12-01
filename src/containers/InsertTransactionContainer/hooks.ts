import {  useEffect } from "react";
import { useActions } from "./actions.ts";
import { useSelectors } from "./selectors.ts";
import { insertTransaction } from "../../service/Service";

export function useInsertTransactionContainer({ accessToken }) {
  const selectors = useSelectors();
    const { fetchTransactionsByXmlCPF } = useActions({
    ...selectors,
    accessToken,
  });

  const {
    rows,
    setIsLoading,
    setSuccessInsertion,
    setRowSelectionModel,
    setDate,
    rowSelectionModel,
    setFileTransactionEntity,
    setFileTransactions,
    isLoading,
    successInsertion,
    setFile,
    date,
    file,
  } = selectors

  useEffect(() => {
    if (!file) return;

    fetchTransactionsByXmlCPF(file);
  }, [accessToken, fetchTransactionsByXmlCPF, file]);

  const handleInsertTransaction = async () => {
    setIsLoading(true);
    // console.log(rowSelectionModel, rows)
    // const transactionToInsert = transactions.filter((transaction) => {
    //   return rowSelectionModel.includes(transaction.consistencyKey);
    // });

    const insertTransactionsPromises = rows.map(
      async (transaction) => {
        const { accessKey, transactionId } = transaction;
        const insertedTransaction = insertTransaction({
          chaveAcesso: accessKey,
          transactionId,
          accessToken,
        });
        return insertedTransaction;
      }
    );

    await Promise.all(insertTransactionsPromises);
    setIsLoading(false);
    setSuccessInsertion(true);
  };

  const handleRowSelection = (rowSelection) => {
    setRowSelectionModel(rowSelection);
  };

  const handleInputChange = (name, eventDate) => {
    const value = eventDate.format("YYYY-MM-DD");
    setDate({ ...date, [name]: value });
  };

    const clearState = () => {
      setDate({ startDate: "", endDate: "" });
      setFile(null);
      setFileTransactionEntity(null);
      setRowSelectionModel([]);
      setSuccessInsertion(false);
      setFileTransactions(null)
    };

  return {
    handleInsertTransaction,
    handleRowSelection,
    handleInputChange,
    rows,
    setIsLoading,
    setSuccessInsertion,
    setRowSelectionModel,
    setDate,
    rowSelectionModel,
    isLoading,
    successInsertion,
    setFile,
    date,
    file,
    clearState,
  };
}
