const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/E-commerce")
.then(() => {
    console.log("Database connected...");
})
.catch((error) => {
    console.log(error);
});