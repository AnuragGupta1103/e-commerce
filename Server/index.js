const express = require('express');
const app = express();

// making a mongodb connection in config file.
require('./db/config');

// importing a User Schema
const User = require("./db/User");

// importing a product schema
const Product = require("./db/Product");

// middleware controls the data sent from api or postman
app.use(express.json());

// cors --> used to allow multiple servers to run on machine.
const cors = require('cors');
app.use(cors());

// JWT (json web token) : api authentication
const jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';    // key required to make for security

// making a signup API
app.post('/register', async (req, res) => {
    // res.send(req.body);

    let user = new User(req.body);
    let result = await user.save();     // saving the new user
    result = result.toObject();         // ye object mein convert kar dega
    delete result.password;
    // res.send(result);

    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if(err) {
            res.send({result: 'Something went wrong, Please try after sometime...'});
        }
        res.send({result, auth: token});
    });
})

// login API
app.post("/login", async (req ,res) => {
    // res.send(req.body);

    console.log(req.body);
    if(req.body.password && req.body.email)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user)    // got here result
        {
            jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if(err) {
                    res.send({result: 'Something went wrong, Please try after sometime...'});
                }
                res.send({user, auth: token});
            });
            // res.send(user);
        }
        else{
            res.send({result: 'No user found'});
        }
    }
    else{
        res.send({result: 'No result found'});
    }


})

// adding a product (api)
app.post('/add-product', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

// listing all the products (api)
app.get('/products', async (req, res) => {
    let products = await Product.find();
    if(products.length > 0)
    {
        res.send(products);
    }
    else
        res.send({result : 'No Products found'});
})

// delete product (api)
app.delete('/product/:id', async (req, res) => {
    // res.send(req.params.id);

    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

// to get a single product (api)
app.get('/product/:id', async (req, res) => {
    let result = await Product.findOne({_id:req.params.id});
    if(result) {
        res.send(result);
    }
    else{
        res.send({result: "No record found"});
    }
})

// update karne ke liye -> PUT METHOD
app.put('/product/:id', async (req, res) => {
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set: req.body
        }
    );
    res.send(result);
})

// search (api)
app.get('/search/:key', async (req, res) => {
    let result = await Product.find({
        "$or" : [
            { name: {$regex: req.params.key} },
            { company: {$regex: req.params.key} }
        ]
    });

    res.send(result);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server is listening at port " + PORT);
})