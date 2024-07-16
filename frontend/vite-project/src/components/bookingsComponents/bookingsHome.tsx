import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/dataService';

const bookingColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'customerId', headerName: 'Customer ID', width: 150 },
  { field: 'packageId', headerName: 'Package ID', width: 150 },
  { field: 'startDate', headerName: 'Start Date', width: 150 },
  { field: 'allInclusive', headerName: 'All Inclusive', width: 150 },
];

function BookingsList() {
  const [bookingRows, setBookingRows] = useState([]);
  const navigate = useNavigate();

  const handleLoadBookings = async () => {
    const data = await fetchData('bookings');
    const mappedData = data.map((item: { Customer_ID: any; Package_ID: any; Date_Start: any; All_Inclusive: any; }, index: number) => ({
      id: index + 1,
      customerId: item.Customer_ID,
      packageId: item.Package_ID,
      startDate: item.Date_Start,
      allInclusive: item.All_Inclusive,
    }));
    setBookingRows(mappedData);
  };

  const handleClearBookings = () => {
    setBookingRows([]);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Bookings List</h1>
      <DataGrid
        rows={bookingRows}
        columns={bookingColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoadBookings}
        style={{ margin: '10px' }}
      >
        Load Bookings
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearBookings}
        style={{ margin: '10px' }}
      >
        Clear Bookings
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleNavigate('/bookings/create')}
        style={{ margin: '10px' }}
      >
        Create Booking
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleNavigate('/bookings/edit/:id')}
        style={{ margin: '10px' }}
      >
        Edit Booking
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleNavigate('/bookings/delete/:id')}
        style={{ margin: '10px' }}
      >
        Delete Booking
      </Button>
    </div>
  );
}

export default BookingsList;
