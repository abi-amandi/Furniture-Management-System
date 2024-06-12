import { useState } from "react";
import axios from "axios";
import './addwarehouse.css'

function AddWarehouse() {
    const [order, setOrder] = useState({
        warehouse_id: "",
        warehouse_name: "",
        location: "",
        contact_number: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { value, name } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Validation based on field name
        let errorObj = { ...errors };

        switch (name) {
           
            case "contact_number":
                errorObj[name] = !/^\d{10}$/.test(value) ? "Contact number must be a 10-digit number." : "";
                break;
            default:
                errorObj[name] = "";
                break;
        }

        setErrors(errorObj);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for any validation errors
        for (const key in order) {
            if (!order[key]) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [key]: `${key.split('_').join(' ')} is required.`
                }));
            }
        }

        if (Object.values(errors).some(error => error !== "")) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/warehouse/create", order);
            console.log(response.data); // Assuming response contains relevant data
            alert("Warehouse details added successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add warehouse details. Please try again later.");
        }
    }

    return (
        <div className="add-warehouse" style={{ marginBottom: '40px' }}>
            <h2>Enter Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Warehouse ID:</label>
                <input type="text" id="warehouse_id" name="warehouse_id" onChange={handleChange} />
                {errors.warehouse_id && <span className="error">{errors.warehouse_id}</span>}
                <br />

            
                <label>Warehouse Name:</label>
                <input type="text" id="warehouse_name" name="warehouse_name" onChange={handleChange} />
                {errors.warehouse_name && <span className="error">{errors.warehouse_name}</span>}
                <br />

                <label>Location:</label>
                <input type="text" id="location" name="location" onChange={handleChange} />
                {errors.location && <span className="error">{errors.location}</span>}
                <br />

                <label>Contact Number:</label>
                <input type="text" id="contact_number" name="contact_number" onChange={handleChange} />
                {errors.contact_number && <span className="error">{errors.contact_number}</span>}
                <br />

                <button type="submit" id="addbtn" style={{ marginTop: '8%' }}>Add Details</button>
            </form>

            <br/> <br/>
        </div>
    );
}

export default AddWarehouse;
