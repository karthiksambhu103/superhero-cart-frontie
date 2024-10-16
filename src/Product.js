import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Product() {
  const { id } = useParams(); // Get the product ID from the route parameters
  const [product, setProduct] = useState(null); // State to store the product details

  useEffect(() => {
    // Fetch product details by ID
    const fetchProductById = async () => {
      const url = `https://fakestoreapi.com/products/${id}`;
      try {
        const response = await fetch(url);
        const parsedData = await response.json();
        setProduct(parsedData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductById(); // Call the function
  }, [id]); // Dependency array includes `id`, so the effect runs when the `id` changes




  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the existing cart or initialize as empty
    cart.push(product); // Add the current product to the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Store the updated cart back to local storage
    alert('Product added to cart');
  };




  const navigate = useNavigate();




  return (
    <div>
      {product ? (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} style={{ width: '200px' }} />
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>

          <button onClick={() => navigate('/form/', { state: { product } })} style={{ marginLeft: '10px', color: 'blue' }}>
            Buy Now
          </button>

        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}

export default Product;
