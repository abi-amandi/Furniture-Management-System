import { useState, useEffect } from 'react';
import '../styles/VehicleDash.css';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const VehicleRaw = await fetch('/api/deliveryvehicles');
                const VehicleJson = await VehicleRaw.json();
                setVehicles(VehicleJson);
                setLoading(false);
            } catch (errors) {
                console.log(errors);
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const deleteVehicle = async (id) => {
        try {
            await fetch(`/api/deliveryvehicles/${id}`, {
                method: 'DELETE',
            });
            alert('Vehicle deleted successfully');
            // Refresh the list of vehicles after deletion
            const updatedVehicles = vehicles.filter(vehicle => vehicle._id !== id);
            setVehicles(updatedVehicles);
            setIsPopupOpen(false); // Close the popup after deletion
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            alert('Failed to delete vehicle. Please try again.');
        }
    }

    const openPopup = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginTop: '30px' }}>
                <div style={{ marginLeft: '50px' }}>
                    <div>
                        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Vehicle list in the center</p>
                    </div>
                </div>
                <div className="vertical-line" style={{ borderTop: '2px solid #D3D3D3', width: '94%', margin: '0 auto' }}></div>
                <div style={{ marginBottom: '100px' }} >
                    <div style={{ marginLeft: '400px', marginRight: '50px', marginTop: '100px' }}>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th className="col"></th>
                                    {/* <th className="col">Driver</th> */}
                                    <th className="col">Vehicle Number</th>
                                    {/* <th className="col">Contact Number</th> */}
                                    {/* <th className="col">Current Order</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles && vehicles.map((vehicle) => (
                                    <tr key={vehicle._id} onClick={() => openPopup(vehicle)}>
                                        <td></td>
                                        {/* <td>{vehicle.name}</td> */}
                                        <td>{vehicle.vehicleNumber}</td>
                                        {/* <td>{vehicle.mobile}</td> */}
                                        {/* <td>{vehicle.currentOrder}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <h2>Edit or Delete Vehicle</h2>
                        <p>Vehicle Number: {selectedVehicle.vehicleNumber}</p>
                        <button onClick={() => deleteVehicle(selectedVehicle._id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Vehicles;
