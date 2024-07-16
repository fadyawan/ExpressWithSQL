import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/dataService';

const activityColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
];

function Activities() {
  const [activityRows, setActivityRows] = useState([]);
  const [accessLevel, setAccessLevel] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const level = localStorage.getItem('accessLevel');
    setAccessLevel(level);
  }, []);

  const handleLoadActivities = async () => {
    const data = await fetchData('activities');
    const mappedData = data.map((item: { ID: any; Name: any; Location: any; }) => ({
      id: item.ID,
      name: item.Name,
      location: item.Location,
    }));
    setActivityRows(mappedData);
  };

  const handleClearActivities = () => {
    setActivityRows([]);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoadActivities}
        style={{ margin: '10px' }}
      >
        Load Activities
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearActivities}
        style={{ margin: '10px' }}
      >
        Clear Activities
      </Button>
      {accessLevel === 'admin' && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigate('/activities/create')}
            style={{ margin: '10px' }}
          >
            Create Activity
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigate('/activities/edit/:id')}
            style={{ margin: '10px' }}
          >
            Edit Activity
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigate('/activities/delete/:id')}
            style={{ margin: '10px' }}
          >
            Delete Activity
          </Button>
        </>
      )}
    </div>
  );
}

export default Activities;
