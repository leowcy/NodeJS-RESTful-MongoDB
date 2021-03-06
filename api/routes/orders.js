//Orders Example. 

//import modules
const express = require('express');
const router = express.Router();

//Handle incoming GET request to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order were fetched.'
    });
});

//Handle incoming POST request to /orders
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    
    res.status(201).json({
        message: 'Order was created!',
        order: order
    });
});

//Handle incoming GET request to specific orderId
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details!',
        orderId: req.params.orderId
    });
});

//Handle Delete request to specific orderId
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted!',
        orderId: req.params.orderId
    });
});

module.exports = router;
