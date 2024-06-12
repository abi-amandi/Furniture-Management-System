import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/RiderInvoice.css'

const Riderinvoice = () => {
    const { id } = useParams()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/orders/${id}`)
                setOrder(response.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                console.log(error)
            }
        }

        fetchOrderDetails()
    }, [])

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {order && (
                        <div className="card">
                            <div className="card-header text-black">
                                <h4>Invoice</h4>
                            </div>
                            <div className="card-body">
                                <p><strong>Order ID: #{order._id}</strong></p>
                                <p><strong>Customer Name:</strong> {order.user.username}</p>
                                <p><strong>Delivery Address:</strong> {order.user.address}</p>
                                <p><strong>Total Amount:</strong> LKR {order.total}</p>
                                {/* <p><strong>Payment Method:</strong> {order.paymentMethod}</p> */}
                                {/* <p><strong>Status:</strong> {order.status}</p> */}
                                <button className="btn btn-primary" onClick={handlePrint}>Print Invoice</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Riderinvoice
