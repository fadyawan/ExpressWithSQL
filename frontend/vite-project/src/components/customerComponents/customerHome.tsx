import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/dataService';

const customerColumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'surname', headerName: 'Surname', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'country', headerName: 'Country', width: 150 },
];

function CustomerList() {
  const [customerRows, setCustomerRows] = useState([]);
  const navigate = useNavigate();

  const handleLoadCustomers = async () => {
    const data = await fetchData('customers');
    const mappedData = data.map((item: { ID: any; First_Name: any; Surname: any; Gender: any; Country: any; }) => ({
      id: item.ID,
      first_name: item.First_Name,
      surname: item.Surname,
      gender: item.Gender,
      country: item.Country,
    }));
    setCustomerRows(mappedData);
  };

  const handleClearCustomers = () => {
    setCustomerRows([]);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Customer List</h1>
      <DataGrid
        rows={customerRows}
        columns={customerColumns}
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
      <Button variant="contained" color="primary" onClick={handleLoadCustomers} style={{ margin: '10px' }}>
        Load Customers
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClearCustomers} style={{ margin: '10px' }}>
        Clear Customers
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleNavigate('/customers/create')} style={{ margin: '10px' }}>
        Create Customer
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleNavigate('/customers/edit/:id')} style={{ margin: '10px' }}>
        Edit Customer
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleNavigate('/customers/delete/:id')} style={{ margin: '10px' }}>
        Delete Customer
      </Button>
    </div>
  );
}

export default CustomerList;
