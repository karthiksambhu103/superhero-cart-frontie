import { useEffect, useState } from 'react';

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from local storage when the component loads
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    console.log("Stored Orders:", storedOrders); // Log the orders for debugging

    setOrders(storedOrders);
  }, []);


  const handleDelete = (index) => {
    const updatedOrders = [...orders]; // Copy the current orders array
    updatedOrders.splice(index, 1); // Remove the order at the given index
    setOrders(updatedOrders); // Update state
    localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Save the updated orders to local storage
  };


  return (
    <div style={{ margin: '20px' }}>
      <h2>Order History</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>

            <p><strong>Customer:</strong> {order.customer.name}</p>
            <p><strong>Address:</strong> {order.customer.address}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
            <p><strong>Order Date:</strong> {order.date}</p>

            <h4>Products:</h4>
            {order.product && order.product.length > 0 ? (
              order.product.map((product, i) => (
                <div key={i} style={{ padding: '5px', margin: '5px' }}>
                  <p><strong>{product.title}</strong></p>
                  <p><strong>Price:</strong> ${product.price}</p>
                </div>
              ))
            ) : (
              <p>No products available for this order.</p>
            )}

            <button onClick={() => handleDelete(index)} style={{ marginTop: '10px' }}>
              Cancel Order
            </button>


          </div>
        ))
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
}

export default Order;
