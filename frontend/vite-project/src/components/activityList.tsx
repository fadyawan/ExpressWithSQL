import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { fetchData } from '../services/dataService';

const activityColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'activity_type', headerName: 'Activity Type', width: 150 },
  { field: 'hotel_id', headerName: 'Hotel ID', width: 150 },
  { field: 'for_kids', headerName: 'For Kids', width: 150 },
];

function ActivityList() {
  const [activityRows, setActivityRows] = useState([]);

  const handleLoadActivities = async () => {
    const data = await fetchData('activities');
    const mappedData = data.map((item: { ID: any; Activity_Type: any; Hotel_ID: any; For_Kids: any; }) => ({
      id: item.ID,
      activity_type: item.Activity_Type,
      hotel_id: item.Hotel_ID,
      for_kids: item.For_Kids,
    }));
    setActivityRows(mappedData);
  };

  const handleClearActivities = () => {
    setActivityRows([]);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Activity List</h1>
      <DataGrid
        rows={activityRows}
        columns={activityColumns}
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
      <Button variant="contained" color="primary" onClick={handleLoadActivities} style={{ margin: '10px' }}>
        Load Activities
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClearActivities} style={{ margin: '10px' }}>
        Clear Activities
      </Button>
    </div>
  );
}

export default ActivityList;
