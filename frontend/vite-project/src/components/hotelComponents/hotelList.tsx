import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchData } from '../../services/dataService';

const hotelColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'price_per_night', headerName: 'Price Per Night', width: 150 },
];

function hotelList() {
  const [hotelRows, setHotelRows] = useState([]);

  const handleLoadHotels = async () => {
    const data = await fetchData('hotels');
    const mappedData = data.map((item: { ID: any; Name: any; Location_ID: any; Price_Per_Night: any; }) => ({
      id: item.ID,
      name: item.Name,
      location: item.Location_ID,
      price_per_night: item.Price_Per_Night,
    }));
    setHotelRows(mappedData);
  };

  const handleClearHotels = () => {
    setHotelRows([]);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Hotel List</h1>
      <DataGrid
        rows={hotelRows}
        columns={hotelColumns}
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
      <Button variant="contained" color="primary" onClick={handleLoadHotels} style={{ margin: '10px' }}>
        Load Hotels
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClearHotels} style={{ margin: '10px' }}>
        Clear Hotels
      </Button>
    </div>
  );
}

export default hotelList;
