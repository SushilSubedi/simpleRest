const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const User = require('../../Models/user');

router.post("/signup", (req,res,next) => {
    User.find({email:req.body.email}).exec().then(user =>{
        if(user.length >= 1){
          return  res.status(409).json({message: " user with email address is already added!"})
        }else{
            bycrypt.hash(req.body.password, 10, (err,hash) => {
                if(err){
                    res.status(404).json({
                        message: 'User is not created'
                    })
                }else{
                    const user = new User({
                        _id:  new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User is created!'
                        })
                    }).catch(error => {
                        res.status(500).json({
                            error: error
                        })
                    })
                }
            })
        }
    }).catch(error => {
      return  res.status(404).json({error:error})
    });
});

router.delete('/:userId', (req,res,next)=>{
    const id =   req.params.userId;
    User.remove({_id: id}).exec()
    .then(result =>{
        res.status(200).json({message:'User is deleted successfully'})
    }).catch(error => {
        return  res.status(404).json({error:error})
      })
})

module.exports = router;