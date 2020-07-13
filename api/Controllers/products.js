const Product = require('../../Models/products');
const mongoose = require('mongoose');

exports.GET_ALL_Order =  (req,res) => {
    Product.find().select('name price _id productImage').exec().then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/products'
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch (error => {
        res.status(500).json({error:error});
    });
}

exports.POST_New_Product = (req,res,next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result =>{
        res.status(200).json({
            message: 'Created product is done',
            productCreated: {
                name: result.name,
                price: result.price,
                _id: result._id,
                productImage: result.productImage,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/products/${result._id}`
                }

            }
        })
    }).catch(err =>{
        res.status(404).json({
            message: 'The product is not created',
            error: err
        })
    });
}

exports.GET_SELECTED_PRODUCT =  (req,res) => {
    const id = req.params.productId;
    Product.findById(id).select('-_v').exec().then(doc =>{
        if(doc){
            const response = {
                name: doc.name,
                price: doc.price,
                _id: doc._id,
                response: {
                    type: "GET",
                    url: `http://localhost:3000/products/`
                }
            }
            res.status(201).json(response);
        }else{
            res.status(404).json({message: 'There is no element with this id'});
        }
    }).catch(err =>{
        res.status(500).json({error: err.message, message: 'no id'});
    });
}

exports.Updated_Product = (req,res) => {
    const id = req.params.productId;
     const updateOps = {};
     for (const ops of req.body) {
         updateOps[ops.propName] = ops.value;
     }
    Product.update({_id: id}, {$set: updateOps}).exec()
    .then(result => {
        const response = {
            name: result.name,
            price: result.price,
            _id: result._id,
            response: {
                type: "GET",
                url: `http://localhost:3000/products/${result_id}`
            }
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.delete_Product = (req,res) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            message: 'The item is deleted',
            _id: id
        });
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
}