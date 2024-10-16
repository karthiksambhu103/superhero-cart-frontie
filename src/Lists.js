import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import Visit from './Visit';

function Lists() {


    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('electronics');

    // Fetch categories
    const fetchCategories = async () => {
        const url = 'https://fakestoreapi.com/products/categories';
        try {
            const response = await fetch(url);
            const parsedData = await response.json();
            setCategories(parsedData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch products by category
    const fetchProductsByCategory = async (category) => {
        const url = `https://fakestoreapi.com/products/category/${category}`;
        try {
            const response = await fetch(url);
            const parsedData = await response.json();
            setProducts(parsedData);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProductsByCategory('electronics');
    }, []);

    // Handle category selection
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        fetchProductsByCategory(category);
    };



    return (
        <div >
            <Visit />
            <div className="App">



                <div style={{ height: '0vh', backgroundColor: '#f9f9f9', position: "sticky", top: "0px", zIndex: "10" }}  >

                    <h2 style={{ margin: "30px" }}>Categories</h2>

                    <ul style={{ listStyle: 'none' }}>
                        {categories.map((category, index) => (
                            <li key={index} onClick={() => handleCategoryClick(category)} style={{ fontWeight: "bold", padding: "5px", cursor: 'pointer', color: selectedCategory === category ? 'blue' : 'black' }}>
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>


                <div>
                    <h2 style={{ margin: "30px" }}>Products {selectedCategory && `in ${selectedCategory}`}</h2>

                    {products.length > 0 ? (
                        <div>
                            {products.map((product) => (
                                <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: "30vw" }}>
                                    <h2>{product.title}</h2>
                                    <img src={product.image} alt={product.title} style={{ width: '50px' }} />
                                    <p><strong>Price:</strong> ${product.price}</p>
                                    <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>

                                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'blue' }}>View Details</Link>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>{selectedCategory ? 'Loading products...' : 'Please select a category'}</p>
                    )}

                </div>


                <h2 style={{ height: '0vh', backgroundColor: '#f9f9f9', position: "sticky", top: "30px", zIndex: "10", }}><Link to="/Cart/" style={{ textDecoration: 'none', color: 'black', margin: "30px" }}>Cart</Link></h2>
                <h2 style={{ height: '0vh', backgroundColor: '#f9f9f9', position: "sticky", top: "30px", zIndex: "10" }} ><Link style={{ textDecoration: 'none', color: 'black', margin: "30px" }} to="/order/" >My Orders</Link></h2>



            </div>
        </div>
    )
}

export default Lists
