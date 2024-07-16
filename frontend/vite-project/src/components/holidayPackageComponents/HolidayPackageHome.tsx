import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/dataService';

const holidayPackageColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'hotel_id', headerName: 'Hotel ID', width: 150 },
  { field: 'number_of_nights', headerName: 'Number of Nights', width: 180 },
  { field: 'discount', headerName: 'Discount', width: 150 },
];

function HolidayPackage() {
  const [holidayPackageRows, setHolidayPackageRows] = useState([]);
  const [accessLevel, setAccessLevel] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const level = localStorage.getItem('accessLevel');
    setAccessLevel(level);
    console.log(localStorage.getItem('accessLevel'))
  }, []);

  const handleLoadHolidayPackages = async () => {
    const data = await fetchData('holidayPackages');
    const mappedData = data.map((item: { ID: any; Name: any; Hotel_ID: any; Number_Of_Nights: any; Discount: any; }) => ({
      id: item.ID,
      name: item.Name,
      hotel_id: item.Hotel_ID,
      number_of_nights: item.Number_Of_Nights,
      discount: item.Discount,
    }));
    setHolidayPackageRows(mappedData);
  };

  const handleClearHolidayPackages = () => {
    setHolidayPackageRows([]);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Holiday Package List</h1>
      <DataGrid
        rows={holidayPackageRows}
        columns={holidayPackageColumns}
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
        onClick={handleLoadHolidayPackages}
        style={{ margin: '10px' }}
      >
        Load Holiday Packages
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClearHolidayPackages}
        style={{ margin: '10px' }}
      >
        Clear Holiday Packages
      </Button>
      {accessLevel === 'admin' && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigate('/holiday-packages/create')}
            style={{ margin: '10px' }}
          >
            Create Holiday Package
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigate('/holiday-packages/edit/:id')}
            style={{ margin: '10px' }}
          >
            Edit Holiday Package
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigate('/holiday-packages/delete/:id')}
            style={{ margin: '10px' }}
          >
            Delete Holiday Package
          </Button>
        </>
      )}
    </div>
  );
}

export default HolidayPackage;
