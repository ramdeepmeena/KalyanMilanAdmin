import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar';
import { getInitials } from '../../utils/get-initials';
import { updateEventField } from '../../utils/get-single-user';
// import { useRouter } from 'next/router';

export const GamesTable = (props) => {
    // const router = useRouter();
    const {
        count = 0,
        items = [],
        // onDeselectAll,
        // onDeselectOne,
        onPageChange = () => { },
        onRowsPerPageChange,
        // onSelectAll,
        // onSelectOne,
        page = 0,
        rowsPerPage = 0,
        // selected = [],
        handleRowSelect,
        searchQuery = '', // Accept search query as a prop
    } = props;
    const filteredItems = items?.filter((customer) =>
        customer.title.toLowerCase().includes(searchQuery.toLowerCase())
        // Add more fields as needed for search
    );
    // Apply pagination to the filtered results
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = filteredItems?.slice(start, end);
    // const selectedSome = (selected.length > 0) && (selected.length < items.length);
    // const selectedAll = (items.length > 0) && (selected.length === items.length);
    const handleFieldUpdate = async (customerId, field, value) => {
        try {
            await updateEventField(customerId, field, value);
        } catch (error) {
            console.error('Error updating customer field:', error);
            // Optionally, handle the error (e.g., show a notification to the user)
        }
    };

    return (
        <Card sx={{ border: '1px solid #556ee6' }}>
            <Scrollbar sx={{ '.simplebar-placeholder': { display: 'none !important' } }}>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell>
                                    Game Name
                                </TableCell>
                                <TableCell>
                                    Open Timing
                                </TableCell>
                                <TableCell>
                                    Close Timing
                                </TableCell>
                                <TableCell>
                                    Active
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems?.length === 0 ? ( // Check if there are no matching results
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No user data
                                    </TableCell>
                                </TableRow>
                            ) : (paginatedItems?.map((customer, index) => {
                                // const isSelected = selected.includes(customer.id);
                                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                                return (
                                    <TableRow
                                        hover
                                        key={customer.id}
                                    // selected={isSelected}
                                    // onClick={() => handleRowSelect(customer.id)}
                                    >
                                        {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell> */}
                                        <TableCell>
                                            {index + 1 + page * rowsPerPage}
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                {/* <Avatar src={customer.avatar}>
                                                    {getInitials(customer.name)}
                                                </Avatar> */}
                                                <Typography variant="subtitle2">
                                                    {customer.title.toUpperCase()}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            {customer.open}
                                        </TableCell>
                                        <TableCell>
                                            {customer.close}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color={customer.isActive === "Yes" ? 'success' : 'error'}
                                                sx={{ lineHeight: 1, fontSize: '0.85rem' }}
                                                onClick={() => handleFieldUpdate(customer.id, 'isActive', customer.isActive === "Yes" ? "No" : "Yes")}
                                            >
                                                {customer.isActive === "Yes" ? 'Yes' : 'No'}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color={'info'}
                                                sx={{ lineHeight: 1, fontSize: '0.85rem' }}
                                                onClick={() => handleRowSelect(customer.id)}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            }))}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 75, 150, 200]}
            />
        </Card>
    );
};

GamesTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
    searchQuery: PropTypes.string,
};
