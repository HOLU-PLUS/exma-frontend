import { ComponentTablePagination } from '@/components';
import { useRequestStore } from '@/hooks';
import { RequestModel } from '@/models';
import { applyPagination } from '@/utils/applyPagination';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import esES from 'date-fns/locale/es';
import { format } from 'date-fns';

interface Props {
  handleEdit?: (role: RequestModel) => void;
}

export const RequestView = (props: Props) => {
  const { handleEdit } = props;
  const { requests, getRequestsByGuest, deleteRequest } = useRequestStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [requestList, setRequestList] = useState<RequestModel[]>([]);
  useEffect(() => {
    getRequestsByGuest();
  }, []);

  useEffect(() => {
    const newList = applyPagination(requests, page, rowsPerPage);
    setRequestList(newList);
  }, [requests, page, rowsPerPage]);

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Inicio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fin</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestList.map((request: RequestModel) => {
              return (
                <TableRow key={request.id}>
                  <TableCell>{`${format(new Date(request.start), 'EEEE dd-MMMM-yyyy HH:mm', {
                    locale: esES,
                  })}`}</TableCell>
                  <TableCell>{`${format(new Date(request.end), 'EEEE dd-MMMM-yyyy HH:mm', {
                    locale: esES,
                  })}`}</TableCell>

                  <TableCell align="right">
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <IconButton onClick={() => handleEdit!(request)}>
                        <EditOutlined color="info" />
                      </IconButton>
                      <IconButton onClick={() => deleteRequest(request.id)}>
                        <DeleteOutline color="error" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={requests.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </>
  );
};
