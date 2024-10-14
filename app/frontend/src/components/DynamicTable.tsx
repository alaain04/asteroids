import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  Box,
  TableSortLabel,
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
  sort?: boolean;
  renderCell: (value: any, column: Column, indexCol: string) => JSX.Element;
}

interface DynamicTableProps {
  columns: Column[];
  rows: any[];
  setPage: (page: number) => void;
  page: number;
  handleSort: (columnId: string, isAsc: boolean) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  rows,
  setPage,
  page,
  handleSort,
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

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
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align ?? "center"}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#5c5d59",
                  color: "#fff",
                  fontSize: "1.2rem",
                  padding: "16px",
                }}
              >
                {column.sort ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={
                      orderBy === column.id ? (order as "asc" | "desc") : "desc"
                    }
                    onClick={() => {
                      const isAsc = orderBy === column.id && order === "asc";
                      handleSort(column.id, isAsc);
                      setOrder(isAsc ? "desc" : "asc");
                      setOrderBy(column.id);
                    }}
                    sx={{
                      "& .MuiTableSortLabel-icon": {
                        color: "#fff !important",
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  <Box> {column.label}</Box>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {!rows?.length ? (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ textAlign: "center" }}>
                <Typography fontSize={14} fontWeight={600}>
                  No rows available
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      align={column.align ?? "left"}
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default DynamicTable;
