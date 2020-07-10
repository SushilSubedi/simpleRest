const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../../Models/orders');
const Product = require('../../Models/products');


router.get('/', (req,res) => {
    Order.find().exec().then(docs => {
        const response = {
            count: docs.length,
            orders: docs.map(doc =>{
                return {
                    _id: doc._id,
                    quantity: doc.quantity,
                    product: doc.product,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders'
                    }
                }
            })
        }
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({error: error});
    })

});

router.post('/', (req,res) => {
    Product.findById(req.body.productId).exec().then(product =>{
        console.log(product)
        if(!product){
            return res.status(404).json({message: 'product is not found'})
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save();

    }).catch(error => {
        res.status(500).json({
            message: ' The product id is not found',
            error: error
        })
 
    })

    .then(result => {
        res.status(200).json({
            message:'Order is placed',
            orderPlaced:{
                _id: result._id,
                quantity: result.quantity,
                product: result.product,
                request:{
                    type: 'GET',
                    url: `http://localhost:3000/products/${result._id}`
                }
            }
        })
    }).catch(error =>{
        res.status(404).json({
            message: 'The order is not placed',
            error: error
        })
    })
});

router.get('/:orderId', (req,res) => {
    const id = req.params.orderId;
    Order.findById(id).select('-_v').exec().then(doc => {
        if(doc){
            const response = {
                _id: doc._id,
                quantity: doc.quantity,
                product: doc.product,
                response: {
                    type: 'GET',
                    url: 'http://localhost:3000/order/'
                }
            }
            res.status(201).json(response);
        }else{
            res.status(404).json({ message: 'There is no element with this id'});
        }
    }).catch(error =>{
        res.status(500).json({error: error});
    })
});


router.delete('/:orderId', (req,res) => {
    const id = req.params.orderId;
    Order.remove({_id: id}).exec().then(result => {
        res.status(200).json({
            message: 'The item is deleted',
            _id: id
        });
        console.log(result);
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
});


module.exports = router;





