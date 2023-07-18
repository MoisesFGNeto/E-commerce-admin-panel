import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage(){
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('/api/orders')
        .then(response => {
          setOrders(response.data);
        });
    }, []);
    return(
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <td>Date</td>
            <td>Paid</td>
            <td>Recipient</td>
            <td>Products</td>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map(order => (
            <tr key={order._id}>
              <td>
                {(new Date(order.createdAt))
                .toLocaleString()}
              </td> 
              <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                {order.paid ? 'Yes' : 'No'}
              </td>
              <td>{order.name} {order.email} <br/>
                {order.city} {order.postalCode} <br/>
                {order.streetAddress} {order.country}
              </td>
              <td>
                {order.line_items.map(l =>(
                  <>
                    {l.price_data?.product_data?.name} x {l.quantity} <br/>
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
    </Layout>
    ) 
}