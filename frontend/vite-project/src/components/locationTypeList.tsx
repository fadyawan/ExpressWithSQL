import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchData } from '../services/dataService';

const locationTypeColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'type', headerName: 'Type', width: 150 },
];

function LocationTypeList() {
  const [locationTypeRows, setLocationTypeRows] = useState([]);

  const handleLoadLocationTypes = async () => {
    const data = await fetchData('locationTypes');
    const mappedData = data.map((item: { ID: any; Type: any; }) => ({
      id: item.ID,
      type: item.Type,
    }));
    setLocationTypeRows(mappedData);
  };

  const handleClearLocationTypes = () => {
    setLocationTypeRows([]);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Location Type List</h1>
      <DataGrid
        rows={locationTypeRows}
        columns={locationTypeColumns}
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
      <Button variant="contained" color="primary" onClick={handleLoadLocationTypes} style={{ margin: '10px' }}>
        Load Location Types
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClearLocationTypes} style={{ margin: '10px' }}>
        Clear Location Types
      </Button>
    </div>
  );
}

export default LocationTypeList;
