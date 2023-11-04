import { useCallback } from "react";
import { readXml } from "../../service/readXml";
import { getNotCollectedTransactions } from "../../service/Service";

export function useActions({ accessToken, setIsLoading, setFileTransactionEntity, setFileTransactions, date }) {
  const fetchTransactionsByXmlCPF = useCallback(async (file) => {
    setIsLoading(true);
    const fileTransactions = await readXml(file?.[0]);

    setFileTransactionEntity(
      fileTransactions.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr };
      }, {})
    );

    const notCollectedTransactionsByAccessKey = await fileTransactions.reduce(
      async (accP, fileTransaction) => {
        const { cpf, id: accessKey } = fileTransaction;
        const { startDate, endDate } = date;

        const notCollectedTransactionsByCpf = await getNotCollectedTransactions(
          {
            cpf,
            startDate,
            endDate,
            accessToken,
          }
        );
        const acc = await accP;
        return { ...acc, [accessKey]: notCollectedTransactionsByCpf };
      },
      {}
    );

    setFileTransactions(notCollectedTransactionsByAccessKey);
    setIsLoading(false);
  }, [date, accessToken, setFileTransactionEntity, setFileTransactions, setIsLoading]);

  return { fetchTransactionsByXmlCPF };
}
