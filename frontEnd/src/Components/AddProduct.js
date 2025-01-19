import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);      // taking a state for empty fields
    
    const navigate = useNavigate();

    const add = () => {
        // console.log(name, price, category, company);
        
        // console.log(!name);
        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }

        // to get the user's id from localStorage
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId._id);

        const info = {name, price, category, company, userId};
        fetch("http://localhost:3001/add-product", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // console.log(data);
            navigate('/');
        })
        .catch((error) => console.log(error));

    }

    return (
        <div className='product'>
            <h1> Add Product </h1>

            <input type="text" placeholder='Enter product name' 
                className='inputBox' value={name} onChange={(e)=>setName(e.target.value)}
            />
            { error && !name && <span className='invalid-input'> Enter valid name </span> }

            <input type="text" placeholder='Enter product price' 
                className='inputBox' value={price} onChange={(e)=>setPrice(e.target.value)}
            />
            { error && !price && <span className='invalid-input'> Enter valid Price </span> }

            <input type="text" placeholder='Enter product category' 
                className='inputBox' value={category} onChange={(e)=>setCategory(e.target.value)}
            />
            { error && !category && <span className='invalid-input'> Enter valid category </span> }

            <input type="text" placeholder='Enter product company' 
                className='inputBox' value={company} onChange={(e)=>setCompany(e.target.value)}
            />
            { error && !company && <span className='invalid-input'> Enter valid company </span> }

            <button className='button' onClick={add}> Add Product </button>
        </div>
    )
}

export default AddProduct;