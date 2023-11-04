import { XMLParser } from "fast-xml-parser";
import * as zip from "@zip.js/zip.js";
import moment from "moment";

export const readXml = async (zipFile) => {
    // criar blob zip reader
    // ler blob
    console.log(zipFile)
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
    const parser = new XMLParser();
    const jObj = xmls.map((xml, i) => {
      return { ...parser.parse(xml), id: ids[i] };
    });

    // - close the ZipReader object
    await zipReader.close();

    return jObj.map((objeto) => {
      const { ide, dest, total } = objeto.CFe.infCFe;
      const [y1, y2, y3, y4, m1, m2, d1, d2] = ide.dEmi.toString();
      const cpfLength = dest.CPF?.toString().length;
      return {
        id: objeto.id,
        document: ide.nCFe,
        date: moment(`${y1}${y2}${y3}${y4}-${m1}${m2}-${d1}${d2}`).format(
          "DD/MM/YYYY"
        ),
        totalValue: total.vCFe,
        cpf: cpfLength === 10 ? `0${dest.CPF}` : dest.CPF,
      };
    })
  };