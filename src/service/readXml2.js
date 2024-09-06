import { XMLParser } from "fast-xml-parser";
import * as zip from "@zip.js/zip.js";
import moment from "moment";

export const readXml2 = async (zipFile) => {
  // criar blob zip reader
  // ler blob
  console.log(zipFile);
  const zipReader = new zip.ZipReader(new zip.BlobReader(zipFile));

  // - get entries from the zip file
  const entries = await zipReader.getEntries();

  // - use a TextWriter object to write the unzipped data of the first entry into a string
  const dataPromises = entries.map((entrie) => {
    return entrie.getData(new zip.TextWriter());
  });

  const idspromises = entries.map((entrie) => {
    return entrie.filename.split(".xml")[0];
  });

  const ids = await Promise.all(idspromises);

  // getElementsByTagName("infCFe")
  const xmls = await Promise.all(dataPromises);

  //parse xmls
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    attributesGroupName: "attributes",
  };
  const parser = new XMLParser(options);
  const jObj = xmls.map((xml, i) => {
    return { ...parser.parse(xml), id: ids[i] };
  });
  console.log({ jObj });
  // - close the ZipReader object
  await zipReader.close();

  return jObj.map((objeto) => {
    console.log({ objeto });
    const { ide, dest, total, attributes } = objeto.nfeProc.NFe.infNFe;

    const cpfLength = dest.CPF?.toString().length;
    const totalProd = total.ICMSTot.vProd;
    const totalDesconto = total.ICMSTot.vDesc;
    const totalValue = totalDesconto ? totalProd - totalDesconto : totalProd;
    console.log({ totalDesconto });
    return {
      id: attributes.Id.replace("NFe", ""),
      // document: ide.nCFe,
      date: moment(ide.dhEmi).format("DD/MM/YYYY"),
      totalValue,
      cpf: cpfLength === 10 ? `0${dest.CPF}` : dest.CPF,
    };
  });
};
