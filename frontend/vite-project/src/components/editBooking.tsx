import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Select, MenuItem, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchData, updateData } from '../services/dataService';

interface Booking {
    Booking_ID: number;
    Package_ID: number;
    All_Inclusive: boolean;
    Activities: any[];
}

const EditBookingComponent: React.FC = () => {
    const [bookingId, setBookingId] = useState<number | null>(null);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await fetchData('holidayPackages');
                setPackages(data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchPackages();
    }, []);

    const handleBookingIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBookingId(parseInt(e.target.value, 10));
    };

    const handleFetchBooking = async () => {
        if (!bookingId) return;

        setLoading(true);
        try {
            const data = await fetchData(`bookings/${bookingId}`);
            setBooking(data);
        } catch (error) {
            console.error('Error fetching booking:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePackageChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const packageId = e.target.value as number;
        setBooking({ ...booking!, Package_ID: packageId });
    };

    const handleAllInclusiveChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setBooking({ ...booking!, All_Inclusive: checked });
    };

    const handleActivitiesChange = (activities: any[]) => {
        setBooking({ ...booking!, Activities: activities });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!booking) return;

        try {
            await updateData(`bookings/${bookingId}`, booking);
            console.log('Booking updated successfully!');
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Edit Booking</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        label="Booking ID"
                        type="number"
                        value={bookingId || ''}
                        onChange={handleBookingIdChange}
                        required
                        fullWidth
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFetchBooking}
                        disabled={!bookingId || loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Fetch Booking'}
                    </Button>
                </div>

                {booking && (
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <Select
                                label="Package Deal"
                                value={booking.Package_ID}
                                onChange={(e) => handlePackageChange(e as React.ChangeEvent<{ value: unknown }>)}
                                fullWidth
                            >
                                {packages.map((pkg) => (
                                    <MenuItem key={pkg.ID} value={pkg.ID}>
                                        {pkg.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={booking.All_Inclusive}
                                        onChange={handleAllInclusiveChange}
                                        name="All_Inclusive"
                                    />
                                }
                                label="All Inclusive"
                            />
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <Autocomplete
                                multiple
                                options={[]}
                                getOptionLabel={(option: any) => option.Activity_Type}
                                onChange={(e, value) => handleActivitiesChange(value)}
                                renderInput={(params) => <TextField {...params} label="Activities" fullWidth />}
                            />
                        </div>

                        <div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default EditBookingComponent;
