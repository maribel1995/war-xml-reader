import { Fragment } from "react";
import { TableComponent } from "../Table";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "../../components/DatePicker";
import { Input, Button, Snackbar, Alert } from "@mui/material";
import { useInsertTransactionContainer } from "./hooks.ts";

export function InsertTransaction({ accessToken }) {
  const {
    handleInsertTransaction,
    handleRowSelection,
    handleInputChange,
    rows,
    rowSelectionModel,
    isLoading,
    successInsertion,
    setFile,
    date,
    clearState,
  } = useInsertTransactionContainer({ accessToken });

  return (
    <Stack alignItems="center">
      <Stack sx={{ padding: "30px" }} direction="row">
        <DatePicker
          label="Data inicial"
          value={date.startDate}
          onChange={(value) => handleInputChange("startDate", value)}
          sx={{ margin: "10px" }}
        />

        <DatePicker
          label="Data final"
          value={date.endDate}
          onChange={(value) => handleInputChange("endDate", value)}
          sx={{ margin: "10px" }}
        />
      </Stack>
      {date.startDate && date.endDate && (
        <Fragment>
          {rows.length === 0 && (
            <label htmlFor="contained-button-file">
              <Input
                accept="application/zip"
                id="contained-button-file"
                type="file"
                sx={{ display: "none" }}
                onChange={(e) => setFile(e.target.files)}
              />
              <Button variant="contained" component="span">
                Upload do xml
              </Button>
            </label>
          )}
          {isLoading && <p>Loading...</p>}
          {rows.length > 0 && (
            <Fragment>
              <TableComponent rows={rows} onRowSelection={handleRowSelection} />
              <LoadingButton
                variant="contained"
                onClick={handleInsertTransaction}
                loading={isLoading}
                disabled={!rowSelectionModel.length}
              >
                Recolher Notas
              </LoadingButton>
              <Button onClick={clearState}>Refazer</Button>
              <Snackbar open={successInsertion} autoHideDuration={6000}>
                <Alert severity="success" sx={{ width: "100%" }}>
                  As Notas foram recolhidas!
                </Alert>
              </Snackbar>
            </Fragment>
          )}
        </Fragment>
      )}
    </Stack>
  );
}
