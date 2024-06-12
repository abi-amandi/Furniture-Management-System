import React, { useState, useRef } from "react";
import image2 from "../../../assets/image2.jpg";
import FolderIcon from "@mui/icons-material/Folder";
import axios from "axios";
import SuccessPage from "./WebSuccessPage";
import webpageIcon from "../../../assets/webpage-icon.png";

const WebpageComplaintFormPage = () => {
  const [formData, setFormData] = useState({
    customerId: "",
    name: "",
    mobile: "",
    email: "",
    date: "",
    address: "",
    url: "",
    acceptStatus: "false",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? (checked ? "true" : "false") : value; // change this line
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim() && name !== "url") {
      setErrors({
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:4000/webpage",
          formData
        );
        console.log("*****************", response.data);
        const { _id } = response.data.webpage; // Extract complaint ID from response
        console.log("=========================", _id);
        setCustomerId(_id);
        setSubmitted(true);
        alert("Complaint submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate each field
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === "string" && !value.trim() && key !== "url") {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };

  const handleFolderIconClick = () => {
    fileInputRef.current.click();
  };
  if (submitted) {
    return <SuccessPage _id={customerId} />;
  }
  return (
    <div
      className="min-h-screen p-8 rounded-lg shadow-md flex items-center justify-center"
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",marginTop:'-5%',marginBottom:'-3.5%'
      }}
    >
      <div className="bg-gray-200 bg-opacity-75 w-full max-w-full rounded-xl p-12"style={{ background: 'rgba(224,255,255, 0.6)',width: '1000px',margin: '50px auto',boxShadow: '0 4px 8px rgba(0,0,0,0.1)',borderRadius: '20px', padding: '10px',marginTop:'5%'}}>
        <div className="flex items-center justify-center mb-8">
          <img
            src={webpageIcon}
            alt="Service Icon"
            style={{ width: "50px", height: "auto", marginRight: "20px" }}
          />
          <h1
            className="font-bold mb-4 text-black text-center"
            style={{ fontSize: "50px" }}
          >
            Webpage Type Complaint
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center mb-4">
            <label
              htmlFor="customerId"
              className="block mr-4 font-bold"
              style={{ minWidth: "150px", fontSize: "20px" }}
            >
              Customer ID:
            </label>
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              onBlur={handleBlur}
              className="flex-grow p-3 border rounded text-lg"style={{width:'80%'}}
            />
          </div>
          {errors.customerId && (
            <p className="text-red-500 text-center">{errors.customerId}</p>
          )}
          <div className="flex items-center mb-4">
            <label
              htmlFor="name"
              className="block mr-4 font-bold"
              style={{ minWidth: "150px", fontSize: "20px" }}
            >
              Customer Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="flex-grow p-3 border rounded text-lg"style={{width:'80%'}}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-center">{errors.name}</p>
          )}
          <div className="flex items-center mb-4">
            <label
              htmlFor="mobile"
              className="block mr-4 font-bold "
              style={{ minWidth: "150px", fontSize: "20px" }}
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              className="flex-grow p-3 border rounded"style={{width:'80%'}}
            />
          </div>
          {errors.mobile && (
            <p className="text-red-500 text-center">{errors.mobile}</p>
          )}
          <div className="flex items-center mb-4">
            <label
              htmlFor="email"
              className="block mr-4 font-bold "
              style={{ minWidth: "150px", fontSize: "20px" }}
            >
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="flex-grow p-3 border rounded"style={{width:'80%'}}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-center">{errors.email}</p>
          )}
          <div className="flex items-center mb-4">
            <label
              htmlFor="address"
              className="block mr-4 font-bold "
              style={{ minWidth: "150px", fontSize: "20px" }}
            >
              Address :
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="flex-grow p-3 border rounded"style={{width:'80%'}}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-center">{errors.address}</p>
          )}
          <div className="flex flex-wrap">
            <div className="flex items-center mb-4" style={{ width: "50%" }}>
              <label
                htmlFor="date"
                className="block mr-4 font-bold "
                style={{ minWidth: "150px", fontSize: "20px" }}
              >
                Date of the Complaint:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                onBlur={handleBlur}
                className="p-3 border rounded w-full mr-4"
                style={{ minWidth: "200px" }}
              />
            </div>
            <div className="flex items-center mb-4" style={{ width: "50%" }}>
              <label
                htmlFor="time"
                className="block mr-4 font-bold "
                style={{ minWidth: "150px", fontSize: "20px" }}
              >
                Time of the Complaint:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                onBlur={handleBlur}
                className="p-3 border rounded w-full"
                style={{ minWidth: "200px" }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block mr-4 font-bold"
              style={{ minWidth: "150px", fontSize: "20px" }}
            >
              Here, add the screenshot of the error web page:
            </label>
          </div>
          <div className="flex items-center mb-4" >
            <div className="border rounded p-3 flex-grow relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                onBlur={handleBlur}
                className="hidden"
                accept="image/*"
              />
              <FolderIcon
                className="absolute right-0 bottom-0  m-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleFolderIconClick}
              />
              {formData.url && (
                <img
                  src={formData.url}
                  alt="Complaint Screenshot"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
              )}
              <textarea
                className="w-full h-full border-none bg-white p-6 pl-10"
                value={formData.url}
                readOnly style={{ width: '80%' }}
              />
            </div>
          </div>
          {errors.url && (
            <p className="text-red-500 text-center">{errors.url}</p>
          )}
          <div className="flex justify-between items-center mb-4">
            <div
              className="bg-gray-200 bg-opacity-75 rounded-xl p-4"
              style={{ maxWidth: "fit-content" }}
            >
              <input
                type="checkbox"
                id="acceptStatus"
                name="acceptStatus"
                checked={formData.acceptStatus === "true"}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mr-2" 
              />
              <label
                htmlFor="acceptStatus"
                className="font-bold"
                style={{ fontSize: "20px" }}
              >
                I'm not a Robot
              </label>
            </div>
            <button
              type="submit"
              className="bg-[#4b2d2b] hover:bg-blue-400 text-black font-extrabold py-4 px-8 rounded-xl"
              style={{ fontSize: "20px" ,fontSize: '20px', margin: 'auto', display: 'block'}}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebpageComplaintFormPage;
