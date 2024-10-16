import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage when the component loads
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Remove the item at the specified index
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
  };


  const handleBuyAll = () => {
    navigate('/form', { state: { products: cart } });
  };



  return (
    <div>


      <h2 style={{margin:"20px"}}>Your Cart</h2>
      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} style={{ width: '100px' }} />
              <p><strong>Price:</strong> ${item.price}</p>
              <button onClick={() => removeFromCart(index)}>Remove from Cart</button>
            </div>
          ))}


          <button onClick={handleBuyAll} style={{ padding: '10px', margin: '30px' }}>
            Buy All
          </button>


        </>
      ) : (
        <p>Your cart is empty.</p>
      )}


    </div>
  )
}

export default Cart

