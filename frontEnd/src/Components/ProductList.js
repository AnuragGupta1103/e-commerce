import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    } ,[])

    const getProducts = () => {
        
        fetch("http://localhost:3001/products", {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // console.log(data, "products");
            setProducts(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteProduct = (id) => {
        // console.log(id);

        fetch(`http://localhost:3001/product/${id}`, {
            method: 'DELETE'
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data)    getProducts();
        })
        .catch((err) => { console.log(err) })
    }

    const searchHandle = async (e) => {
        // console.log(e.target.value);

        let key = e.target.value;
        if(key) {
            let result = await fetch(`http://localhost:3001/search/${key}`);
            result = await result.json();
    
            if(result) {
                setProducts(result);
            }
        }
        else{
            getProducts();
        }

    }

    return (
        <div className='product-list'>
            <h1> Product List </h1>
            <input className='search-product-box' type="text" placeholder='Search Product'
                onChange={searchHandle} />

            <ul>
                <li> S. No. </li>
                <li> Name </li>
                <li> Price </li>
                <li> Category </li>
                <li> Operation </li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) => 
                    <ul key={item._id}>
                        <li> {index + 1} </li>
                        <li> {item.name} </li>
                        <li> $ {item.price} </li>
                        <li> {item.category} </li>
                        <li> 
                            <button onClick={() => deleteProduct(item._id)}> Delete </button>
                            <Link to={"/update/" + item._id}> Update </Link>
                        </li>
                    </ul>
                )
                : <h1> No Result Found </h1>
            }
        </div>
    )
}

export default ProductList;