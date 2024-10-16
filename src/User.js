import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedbackForm from './FeedbackForm'; // Import FeedbackForm component


function User() {
  const { state } = useLocation(); // Receive the product from the state
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const navigate = useNavigate();
  const [feedbackClassification, setFeedbackClassification] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const productsToOrder = state.product ? [state.product] : state.products;


    // Create order object with product and form details
    const order = {
      product: productsToOrder,
      customer: formData,
      date: new Date().toLocaleString(),
    };

    // Retrieve existing orders from local storage and update
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert('Order placed successfully!');


    if (!state.product) {
      localStorage.removeItem('cart');
    }
    setShowFeedback(true);


  };
  const handleFeedbackSubmit = (classification) => {
    setFeedbackClassification(classification);

    // Redirect to home after 5 seconds
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h3>Products:</h3>
      {/* Show either single product or multiple products */}
      {state.product ? (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h3>{state.product.title}</h3>
          <p><strong>Price:</strong> ${state.product.price}</p>
        </div>
      ) : (
        state.products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{product.title}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px' }}>Place Order</button>
      </form>



      {/* Show feedback form if order is placed */}
      {showFeedback && (
        <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
      )}

      {/* Display feedback classification */}
      {feedbackClassification && (
        <div style={{ marginTop: '20px' }}>
          <p>Your feedback is classified as: <strong>{feedbackClassification}</strong></p>
        </div>
      )}





    </div>
  );
}

export default User;
