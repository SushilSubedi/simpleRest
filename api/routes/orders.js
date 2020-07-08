const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
res.status(200).json({
    message: 'Handling Get request to products'
})
});

router.post('/', (req,res) => {
    const order = {
        
    }
    res.status(201).json({
        message: 'Handling POST request to products'
    })
});

router.get('/:orderId', (req,res) => {
    const id = req.params.productId;
    if(id === 'success'){
        res.status(200).json({
            message: 'The identfier is done successful!',
            id: id
        })
    }else {
        res.status(200).json({
            message: 'The id is updated successful'
        })
    }
});

router.patch('/:orderId', (req,res) => {
    res.status(200).json({
        message: 'updated product'
    });
});

router.delete('/:orderId', (req,res) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});


module.exports = router;