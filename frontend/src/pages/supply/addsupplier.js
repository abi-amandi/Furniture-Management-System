import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddSupplier() {
    const [order, setOrder] = useState({
        supplier_name: "",
        company_name: "",
        address: "",
        email: "",
        contact: "",
    });

    const [errors, setErrors] = useState({});

    const validatePhoneNumber = (phoneNumber) => {
        return /^\d{10}$/i.test(phoneNumber);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setOrder((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Clear error when the user starts typing after an error message
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formValid = true;
        const errors = {};

        if (!validatePhoneNumber(order.contact)) {
            errors.contact = "Please enter a valid phone number";
            formValid = false;
        }

        if (!validateEmail(order.email)) {
            errors.email = "Please enter a valid email";
            formValid = false;
        }

        if (formValid) {
            try {
                const response = await axios.post(
                    "http://localhost:4000/api/supplier/create",
                    order
                );
                console.log(response.data);
                // Show success message using SweetAlert
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Supplier added successfully",
                });
            } catch (error) {
                console.error("Error adding supplier: ", error);
                // Show error message using SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to add supplier. Please try again later.",
                });
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", marginTop: "50px", marginBottom: '40px',padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Supplier Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        name="supplier_name"
                        value={order.supplier_name}
                        onChange={handleChange}
                        placeholder="Supplier Name"
                        style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        name="company_name"
                        value={order.company_name}
                        onChange={handleChange}
                        placeholder="Company Name"
                        style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        name="address"
                        value={order.address}
                        onChange={handleChange}
                        placeholder="Address"
                        style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        name="email"
                        value={order.email}
                        onChange={handleChange}
                        placeholder="Email"
                        style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "5px", border: `1px solid ${errors.email ? "#dc3545" : "#ccc"}` }}
                    />
                    {errors.email && <span style={{ color: "#dc3545", fontSize: "12px" }}>{errors.email}</span>}
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        name="contact"
                        value={order.contact}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "5px", border: `1px solid ${errors.contact ? "#dc3545" : "#ccc"}` }}
                    />
                    {errors.contact && <span style={{ color: "#dc3545", fontSize: "12px" }}>{errors.contact}</span>}
                </div>
                <button
                    type="submit"
                    style={{ width: "100%", height: "40px", backgroundColor: "#007bff", color: "#fff", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "16px" }}
                >
                    Add Details
                </button>
            </form>
        </div>
    );
}

export default AddSupplier;
