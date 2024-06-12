import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './detailsupdate.css';

function UpdateWarehouse() {
  const { id } = useParams();
  const [Updatewarehouse, setUpdatewarehouse] = useState({
    warehouse_id: "",
    
    warehouse_name: "",
    location: "",
    contact_number: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/warehouse/user/${id}`);
        const data = await response.json();

        if (data.success) {
          setUpdatewarehouse(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatewarehouse({
      ...Updatewarehouse,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/warehouse/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Updatewarehouse)
      });

      const data = await response.json();

      if (data.success) {
        console.log('Warehouse updated successfully');
        alert("Warehouse updated successfully");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <div className='warehouse-update'>
      <h2>Update</h2><br />
      <label>Warehouse ID:</label>
      <input type="text" name="warehouse-id" onChange={handleInputChange} value={Updatewarehouse.warehouse_id} /><br />
     
      <label>Warehouse Name:</label>
      <input type="text" name="warehouse_name" onChange={handleInputChange} value={Updatewarehouse.warehouse_name} /><br />
      <label>Location:</label>
      <input type="text" name="location" onChange={handleInputChange} value={Updatewarehouse.location} /><br />
      <label>Contact Number:</label>
      <input type="text" name="contact_number" onChange={handleInputChange} value={Updatewarehouse.contact_number} /><br />
      <button onClick={handleUpdate}>Update</button><br /><br />
    </div>
  );
}

export default UpdateWarehouse;
