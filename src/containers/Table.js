import { useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, gridClasses, useGridApiRef } from "@mui/x-data-grid";
import { styled } from "@mui/material";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .disabled-row": {
    color: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.12);",
  },
  "& .disabled-row:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12);",
  },
}));

export function TableComponent({ rows, onRowSelection }) {
  const apiRef = useGridApiRef();

  const columns = [
    { field: "date", headerName: "Data" },
    {
      field: "value",
      headerName: "Valor",
      width: 150,
      headerAlign: 'center',
    },
    {
      field: "cpf",
      headerName: "CPF",
      width: 150,
      headerAlign: 'center',
    },
    {
      field: "accessKey",
      headerName: "Chave",
      type: "number",
      width: 510,
      headerAlign: 'center',
    },
    {
      field: "collected",
      headerName: "Recolhida",
      width: 90,
      headerAlign: 'center',
    },
    {
      field: "error",
      headerName: "Erro",
      width: 90,
      headerAlign: 'center',
    },
  ];

  useEffect(() => {
    if (apiRef) {
      apiRef.current.setRowSelectionModel(
        rows
          .filter((row) => !row.collected && !row.error)
          .map((row) => row.accessKey)
      );
    }
  }, [apiRef, rows]);

  const handleRowSelection = (newRowSelectionModel) => {
    onRowSelection(newRowSelectionModel);
  };

  return (
    <Box sx={{ height: 400, width: "100%", margin: '20px' }}>
      <StyledDataGrid
        apiRef={apiRef}
        sx={{
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
            {
              outline: "none",
            },
        }}
        getRowClassName={({ row }) => {
          if (row.collected || row.error) {
            return "disabled-row";
          }
        }}
        getCellClassName={() => 'MuiDataGrid-cell--textCenter'}
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        isRowSelectable={({ row }) => !row.collected && !row.error}
        getRowId={(row) => row.accessKey}
        onRowSelectionModelChange={handleRowSelection}
        showCellVerticalBorder={false}
      />
    </Box>
  );
}
