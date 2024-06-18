import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchData } from '../services/dataService';

const locationColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'type', headerName: 'Type', width: 150 },
];

function LocationList() {
  const [locationRows, setLocationRows] = useState([]);

  const handleLoadLocations = async () => {
    const data = await fetchData('locations');
    const mappedData = data.map((item: { ID: any; Name: any; Type: any; }) => ({
      id: item.ID,
      name: item.Name,
      type: item.Type,
    }));
    setLocationRows(mappedData);
  };

  const handleClearLocations = () => {
    setLocationRows([]);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Location List</h1>
      <DataGrid
        rows={locationRows}
        columns={locationColumns}
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
      <Button variant="contained" color="primary" onClick={handleLoadLocations} style={{ margin: '10px' }}>
        Load Locations
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClearLocations} style={{ margin: '10px' }}>
        Clear Locations
      </Button>
    </div>
  );
}

export default LocationList;
