import { useCallback } from "react";
import { readXml } from "../../service/readXml";
import { readXml2 } from "../../service/readXml2";
import { getNotCollectedTransactions } from "../../service/Service";

export function useActions({
  accessToken,
  setIsLoading,
  setFileTransactionEntity,
  setFileTransactions,
  date,
  setErrorReadingXml,
  xmlStrategy,
}) {
  const xml = xmlStrategy === "CF" ? readXml : readXml2;
  const fetchTransactionsByXmlCPF = useCallback(
    async (file) => {
      setIsLoading(true);
      try {
        const fileTransactions = await xml(file?.[0]);
        console.log({ fileTransactions });
        setFileTransactionEntity(
          fileTransactions.reduce((acc, curr) => {
            return { ...acc, [curr.id]: curr };
          }, {})
        );

        const notCollectedTransactionsByAccessKey =
          await fileTransactions.reduce(async (accP, fileTransaction) => {
            const { cpf, id: accessKey } = fileTransaction;
            const { startDate, endDate } = date;

            const notCollectedTransactionsByCpf =
              await getNotCollectedTransactions({
                cpf,
                startDate,
                endDate,
                accessToken,
              });
            const acc = await accP;
            return { ...acc, [accessKey]: notCollectedTransactionsByCpf };
          }, {});

        setFileTransactions(notCollectedTransactionsByAccessKey);
        setIsLoading(false);
      } catch (e) {
        setErrorReadingXml("Erro: " + e.message);
      }
    },
    [
      setIsLoading,
      setErrorReadingXml,
      xml,
      setFileTransactionEntity,
      setFileTransactions,
      date,
      accessToken,
    ]
  );

  return { fetchTransactionsByXmlCPF };
}
