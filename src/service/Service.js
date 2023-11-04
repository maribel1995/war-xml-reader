import axios from "axios";

export const service = axios.create({
  baseURL: "https://portal-api.personalcard.com.br",
  //   headers: {
  //     Authorization: `Bearer ${process.env.TOKEN}`,
  //     "client-id": `${process.env.CLIENT_ID}`,
  //   },
});

export const getAccessToken = async ({ username, password }) => {
  const resp = await service.post("/auth/login", { password, username });
  return resp.data.accessToken;
};

export const getNotCollectedTransactions = async ({
  cpf,
  startDate,
  endDate,
  accessToken,
//   value
}) => {
  const resp = await service.get(
    `/transactions?currentPage=1&perPage=20&recolhida=false&cpf=${cpf}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return resp.data.dados;
//   return [
//     {
//         "id": "de98411c-d0d6-47d4-9022-48d81d67c6ee",
//         "DATA": "2023-10-31T16:29:33.000Z",
//         "NUMSEQ": "63992",
//         "CODCLI": "3571",
//         "CODCRE": "613672",
//         "TIPTRA": "51232",
//         "DESCRICAO": "COMPRA CARTÃO DIGITADO",
//         "CARTAO": "629846*******4676",
//         "STATUS": "A",
//         "VALOR": value,
//         "NUMDOC": "13037",
//         "CPF": cpf,
//         "NUMDEP": null,
//         "DATFECCLI": "0001-01-01T03:06:00.000Z",
//         "NUMCARGA": null,
//         "DATFECCRE": "0001-01-01T03:06:00.000Z",
//         "NUMFECCRE": 91,
//         "MOTIVO": "VALIDA S/NF",
//         "TAXSER": null,
//         "VTAXA": null,
//         "NOMECLI": "SECRETARIA MUN DE EDU PREF DO MUN DE SAO PAULO",
//         "RAZSOC": "WAR UNIFORMES LTDA",
//         "TVALOR": "80",
//         "PARCELA": null,
//         "TPARCELA": 1,
//         "NOMEUSU": null,
//         "NUMFECCLI": 90,
//         "CNPJ": "42589372000145",
//         "exportedat": "2023-11-01T17:19:30.594Z",
        
//     },
//     {
//         "id": "e24bd512-f70d-47af-81a5-52d40e2154aa",
//         "DATA": "2023-10-18T19:06:34.000Z",
//         "NUMSEQ": "19",
//         "CODCLI": "3571",
//         "CODCRE": "613672",
//         "TIPTRA": "51040",
//         "DESCRICAO": "COMPRA ",
//         "CARTAO": "629846*******4676",
//         "STATUS": "A",
//         "VALOR": value,
//         "NUMDOC": "878064",
//         "CPF": cpf,
//         "NUMDEP": null,
//         "DATFECCLI": "0001-01-01T03:06:00.000Z",
//         "NUMCARGA": null,
//         "DATFECCRE": "0001-01-01T03:06:00.000Z",
//         "NUMFECCRE": 89,
//         "MOTIVO": "VALIDA S/NF",
//         "TAXSER": null,
//         "VTAXA": null,
//         "NOMECLI": "SECRETARIA MUN DE EDU PREF DO MUN DE SAO PAULO",
//         "RAZSOC": "WAR UNIFORMES LTDA",
//         "TVALOR": "179,88",
//         "PARCELA": null,
//         "TPARCELA": 1,
//         "NOMEUSU": null,
//         "NUMFECCLI": 88,
//         "CNPJ": "42589372000145",
//         "exportedat": "2023-10-19T11:28:34.485Z",
//     }
// ]
};

export const insertTransaction = async ({ chaveAcesso, transactionId, accessToken }) => {
  const resp = await service.post("/chaves/insert", {
    chaveAcesso,
    transactionId,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data;
};

//POST

// {chaveAcesso: null
// transactionId:"0b03bc5d-ec87-42d7-b764-a894a57f95e5"}

// https://portal-api.personalcard.com.br/chaves/insert
