import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    Snackbar
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../contexts/firebase';

const session = [
    {
        value: '',
        label: ''
    },
    {
        value: 'user',
        label: 'User'
    },
    {
        value: 'admin',
        label: 'Admin'
    },
];

export const AutoDepositDetails = ({ handleValues }) => {
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [values, setValues] = useState({
        date: dayjs().format('YYYY-MM-DD'),
        // game_name: '',
        // subtitle: '***-**-***',
        // password: 'demo@123',
        // money_type: '',
        // close: '10:45 PM',
        // coins: 1000,
        // phone: '8209555243',
        // state: 'los-angeles',
        // country: 'USA'
    });
    // State to hold game titles
    // const [gameTitles, setGameTitles] = useState([
    //     {
    //         value: '',
    //         label: '',
    //     },
    // ]);
    // Function to fetch game titles from Firebase
    // const fetchGameTitles = async () => {
    //     try {
    //         // Replace this with the actual logic to fetch game titles from Firebase
    //         // For example, if you're using Firestore
    //         const eventsCollection = collection(db, 'Events');
    //         const eventsSnapshot = await getDocs(eventsCollection);

    //         const titles = eventsSnapshot.docs.map(doc => ({
    //             value: doc.data().title, // Keep original casing as label
    //             label: doc.data().title.toUpperCase(), // Set value to lowercase
    //         }));

    //         // Update the gameTitles state by merging the existing titles with the new ones
    //         setGameTitles([{
    //             value: '',
    //             label: '',
    //         },
    //         ...titles]);
    //     } catch (error) {
    //         console.error('Error fetching game titles:', error);
    //     }
    // };
    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );
    const handleSubmit = (event) => {
        event.preventDefault();
        // Other form submission logic
        if (!values.money_type) {
            setSnackbarMessage('Please Select Deposit Type!');
            return;
        }
        // If the form is successfully submitted, call the callback function
        handleValues(values);
    };
    // useEffect(() => {
    //     fetchGameTitles();
    // }, [])
    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!snackbarMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <Card sx={{ border: '1px solid #556ee6' }}>
                    <CardHeader
                        // subheader="The information can be edited"
                        title="Auto Deposit History Details"
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    // helperText="Please specify the first name"
                                    label="Game Title"
                                    name="title"
                                    onChange={handleChange}
                                    required
                                    value={values.title}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the Yes or No"
                                    label="Active status"
                                    name="isPlay"
                                    onChange={handleChange}
                                    required
                                    value={values.isPlay}
                                />
                            </Grid> */}
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={3}
                                >
                                    <Stack sx={{
                                        '& .css-4jnixx-MuiStack-root': {
                                            padding: '2px'
                                        }
                                    }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Date"
                                                    value={dayjs(values.date)}
                                                    onChange={(newValue) => {
                                                        setValues((prevState) => ({
                                                            ...prevState,
                                                            date: newValue.format('YYYY-MM-DD'),
                                                        }));
                                                    }}
                                                    textField={(props) => (
                                                        <TextField fullWidth label="Date" {...props} sx={{ width: '100%' }} />
                                                    )}
                                                    slotProps={{
                                                        textField: {
                                                            helperText: 'MM/DD/YYYY',
                                                        },
                                                    }}
                                                    maxDate={dayjs()} // Disable future dates
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Stack>
                                    {/* <TextField
                                    fullWidth
                                    label="Open Time"
                                    name="open"
                                    type='timepicker'
                                    onChange={handleChange}
                                    required
                                    value={values.open}
                                /> */}
                                </Grid>
                                {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <Stack sx={{
                                    '& .css-4jnixx-MuiStack-root': {
                                        padding: '2px'
                                    }
                                }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker']}>
                                            <TimePicker
                                                label="Close Time"
                                                value={dayjs(values.close, 'hh:mm A')}
                                                onChange={(newValue) => handleTimeChange('close', newValue)}
                                                textField={(props) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Close Time"
                                                        {...props}
                                                        sx={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                )}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Stack>
                            </Grid> */}
                                {/* <Grid
                                    xs={12}
                                    md={3}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Game Name"
                                        name="game_name"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.game_name}
                                    >
                                        {gameTitles.map((option, index) => (
                                            <option
                                                key={index}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                <Grid
                                    xs={12}
                                    md={3}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Deposit Type"
                                        name="money_type"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.money_type}
                                    >
                                        {session.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </>
    );
};
