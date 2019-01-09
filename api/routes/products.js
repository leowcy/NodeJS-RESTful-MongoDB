//One Example of Product to understand the RESTful Api 
//A products.js to give definitions for all various operations
const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');

//Import the ../models/product.js package
const Product = require('../models/product');

//products-GET-function
//Response the selected content of certain page and provide informations
router.get('/', (req, res, next) => {
    Product.find()
    .select('price name _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price:  doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://locahost:8080/products/' + doc._id
                    }
                }
            })
        };
//        if(docs.length >= 0){
            res.status(200).json(response);
//        }   else    {
//            res.status(404).json(
//                message: 'No entries found'
//            });
//        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Products-POST-function
//Post or Add some data/information to the product
router.post('/', (req, res, next) => {
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result =>{
        console.log(result); 
        res.status(201).json({
            message: 'Created product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: "POST",
                    url: "http://localhost:8080/products/" + result._id  
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
   
});

//Products/productID-GET-function
//get the all info of specific product from the /products
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    
    //Find by iD in MongoDB
    Product.findById(id)
    .select('name price _id') //select specific content. But always shows ID
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'Get_ALL',
                    url: 'http://localhost:8080/products/'
                }
            });
        }   else {
            res.status(404).json({
                message: 'No vaild input'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

    /*//pass id or Special id
    if (id === 'special'){
        res.status(200).json({
            message: 'You discove the special ID',
            id: id
        });
    }   else {
        res.status(200).json({
            message: 'You Passed an ID'
        });
    }
    */
});

//Updated the info of specific product 
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id}, {$set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'PATCH',
                url: 'http://localhost:8080/products/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Delete all info of specific product 
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted!',
            request: {
                type: 'DELETE',
                url: 'http://localhost:8080/products/',
                body: { name: 'String', price: 'Number' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Wrapped the JS as the Module to be imported by app.js
module.exports = router;
