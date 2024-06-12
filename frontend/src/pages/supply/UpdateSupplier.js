import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateSupplier() {
    // Get the id parameter from the URL
    const { id } = useParams();

    // State variable to store the supplier details for update
    const [updateorder, setupdateorder] = useState({
        supplier_name: "",
        company_name: "",
        address: "",
        email: "",
        contact: "",
    });

    // Fetch the supplier details when the component mounts or id changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/supplier/order/${id}`);
                const data = await response.json();

                if (data.success) {
                    setupdateorder(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    // Function to handle input change in the form fields
    const handleInputChange = (e) => {
        setupdateorder({
            ...updateorder,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle the update of supplier details
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/supplier/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updateorder._id,
                    ...updateorder,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Order updated successfully');
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Order updated successfully',
                });
            } else {
                console.error(data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update order. Please try again later.',
                });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update order. Please try again later.',
            });
        }
    };

    return (
        <div className='order-update' style={{ maxWidth: '400px', margin: '0 auto', marginTop: '50px', marginBottom: '50px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Details</h2>

            {/* Supplier Name Input */}
            <label>Supplier Name:</label>
            <input type="text" name="supplier_name" value={updateorder.supplier_name} onChange={handleInputChange} style={{ width: '100%', height: '40px', marginBottom: '20px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

            {/* Company Name Input */}
            <label>Company Name:</label>
            <input type="text" name="company_name" value={updateorder.company_name} onChange={handleInputChange} style={{ width: '100%', height: '40px', marginBottom: '20px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

            {/* Address Input */}
            <label>Address:</label>
            <input type="text" name="address" value={updateorder.address} onChange={handleInputChange} style={{ width: '100%', height: '40px', marginBottom: '20px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

            {/* Email Input */}
            <label>Email:</label>
            <input type="text" name="email" value={updateorder.email} onChange={handleInputChange} style={{ width: '100%', height: '40px', marginBottom: '20px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

            {/* Contact Number Input */}
            <label>Contact Number:</label>
            <input type="text" name="contact" value={updateorder.contact} onChange={handleInputChange} style={{ width: '100%', height: '40px', marginBottom: '20px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

            {/* Update Button */}
            <button onClick={handleUpdate} style={{ width: '100%', height: '40px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Update</button>
        </div>
    );
}

export default UpdateSupplier;
