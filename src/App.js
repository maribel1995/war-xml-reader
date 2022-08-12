import "./App.css";
import { XMLParser } from "fast-xml-parser";
import * as zip from "@zip.js/zip.js";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  TableContainer,
  Input,
  Button,
  Checkbox,
} from "@mui/material";
import "moment";
import moment from "moment";

const CustomizedTableRow = styled(TableRow)`
  & .Mui-selected {
    background-color: "red";
  }
`;

function App() {
  const [asset, setAsset] = useState(null);
  const [objetos, setObjetos] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (!asset) return;
    lerTudo(asset[0]);
  }, [asset]);

  const lerTudo = async (zipFile) => {
    // criar blob zip reader
    // ler blob
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

    setObjetos(jObj);

    // - close the ZipReader object
    await zipReader.close();
  };

  const rows = objetos.map((objeto) => {
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
  });

  const cells = [
    { field: "document", value: "Documento" },
    { field: "date", value: "Data" },
    { field: "totalValue", value: "Valor" },
    { field: "cpf", value: "CPF" },
    { field: "id", value: "Chave" },
  ];

  const headCells = cells.map((cell, i) => (
    <TableCell sx={{ fontWeight: "700" }} key={i}>
      {cell.value}
    </TableCell>
  ));

  const handleOnClick = (event, row) => {
    if (typeof row === "boolean") return;

    const isSelected = selectedRows.some(
      (selectedRow) => selectedRow.id === row.id
    );

    if (isSelected) {
      setSelectedRows((prev) => [...prev].filter((it) => row.id !== it.id));
      return;
    }
    setSelectedRows((prev) => [...prev, row]);
  };
  console.log(selectedRows);

  const table = rows.map((row, j) => {
    return (
      <CustomizedTableRow
        key={`tableRow${j}`}
        selected={selectedRows.some((selectedRow) => selectedRow.id === row.id)}
        onClick={(e) => handleOnClick(e, row)}
      >
        <TableCell>
          <Checkbox onChange={handleOnClick} />
        </TableCell>
        {cells.map((cell, i) => (
          <TableCell align="center" key={`${cell.field}${i}`}>
            {row[cell.field]}
          </TableCell>
        ))}
      </CustomizedTableRow>
    );
  });

  return (
    <div className="App">
      <div className="App-header">
        <label htmlFor="contained-button-file">
          <Input
            accept="application/zip"
            id="contained-button-file"
            type="file"
            sx={{ display: "none" }}
            onChange={(evt) => setAsset(evt.target.files)}
          />
          <Button variant="contained" component="span">
            Upload do xml
          </Button>
        </label>

        {asset && (
          <Paper
            sx={{ margin: "20px", backgroundColor: "#e0e0e0", padding: "10px" }}
          >
            <TableContainer
              component={Paper}
              sx={{ maxWidth: "800px", margin: "20px" }}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {headCells}
                  </TableRow>
                </TableHead>
                <TableBody>{table}</TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </div>
    </div>
  );
}

export default App;
