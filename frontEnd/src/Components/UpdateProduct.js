import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState('');

    // getting the id of the product we need to update from "useParams" Hook.
    const params = useParams();

    useEffect(() => {
        getProductDetails();
    }, []);

    const navigate = useNavigate();

    const getProductDetails = async () => {
        // console.warn(params);

        let result = await fetch(`http://localhost:3001/product/${params.id}`);
        result = await result.json();
        // console.log(result);

        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const update = async () => {
        // console.log(name, price, category, company);

        const info = {name, price, category, company};
        let result = await fetch(`http://localhost:3001/product/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className='product'>
            <h1> Update Product </h1>

            <input type="text" placeholder='Enter product name' 
                className='inputBox' value={name} onChange={(e)=>setName(e.target.value)}
            />

            <input type="text" placeholder='Enter product price' 
                className='inputBox' value={price} onChange={(e)=>setPrice(e.target.value)}
            />

            <input type="text" placeholder='Enter product category' 
                className='inputBox' value={category} onChange={(e)=>setCategory(e.target.value)}
            />

            <input type="text" placeholder='Enter product company' 
                className='inputBox' value={company} onChange={(e)=>setCompany(e.target.value)}
            />

            <button className='button' onClick={update}> Update Product </button>
        </div>
    )
}

export default UpdateProduct;