import { FC, ChangeEvent } from "react";
import {
  Tooltip,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { ITableProps } from "./table_model";

const FtzTable: FC<ITableProps> = ({
  tableData,
  totalData,
  tableHeader,
  limit,
  page,
  editable,
  loading,
  onPageChange,
  onLimitChange,
  onEdit,
  onRemove,
}) => {
  const handlePageChange = (_event: any, newPage: number): void => {
    onPageChange(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onLimitChange(parseInt(event.target.value));
  };

  const LoadingSkeleton = () => (
    <Box
      px={3}
      sx={{
        height: "max-content",
      }}
    >
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" sx={{ my: 4, mx: 1 }} />
      ))}
    </Box>
  );

  const theme = useTheme();

  return (
    <>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeader.map((dataHead, headIndex) => (
                    <TableCell key={headIndex} align={dataHead.align || "left"}>
                      {dataHead.header}
                    </TableCell>
                  ))}
                  {editable && <TableCell align="right">Action</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((record, index) => {
                  return (
                    <TableRow hover key={index}>
                      {tableHeader.map((dataHead, headIndex) => (
                        <TableCell key={headIndex} align={dataHead.align}>
                          <Typography
                            component="div"
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {record[dataHead.key]}
                          </Typography>
                        </TableCell>
                      ))}
                      {editable && (
                        <TableCell align="right">
                          <Tooltip title="Edit Order" arrow>
                            <IconButton
                              onClick={() => onEdit(record)}
                              sx={{
                                "&:hover": {
                                  background: theme.colors.primary.lighter,
                                },
                                color: theme.palette.primary.main,
                              }}
                              color="inherit"
                              size="small"
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Order" arrow>
                            <IconButton
                              onClick={() => onRemove(record)}
                              sx={{
                                "&:hover": {
                                  background: theme.colors.error.lighter,
                                },
                                color: theme.palette.error.main,
                              }}
                              color="inherit"
                              size="small"
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={totalData}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </>
      )}
    </>
  );
};

FtzTable.defaultProps = {
  tableData: [],
  editable: false,
  loading: false,
};

export default FtzTable;
