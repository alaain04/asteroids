import React from "react";
import {
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TablePagination from "@material-ui/core/TablePagination";

interface Column {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  minWidth?: number;
  renderCell: (value: any, column: Column, indexCol: string) => JSX.Element;
}

interface DynamicTableProps {
  columns: Column[];
  rows: any[];
  styleProps?: SxProps;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  rows,
  styleProps,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ ...styleProps }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "center"}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#5c5d59",
                    color: "#fff",
                    fontSize: "1.2rem",
                    padding: "16px",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {!rows?.length ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center" }}
                >
                  <Typography fontSize={14} fontWeight={600}>
                    No rows available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  hover
                  sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}
                >
                  {columns.map((column, i) => {
                    return (
                      <TableCell
                        key={row.id + column.id + i}
                        align={column.align || "left"}
                        sx={{
                          fontSize: "1.1rem",
                          padding: "16px",
                        }}
                      >
                        {column.renderCell(row, column, column.id)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
          component="div"
          count={rows?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          // colSpan={3}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default DynamicTable;
