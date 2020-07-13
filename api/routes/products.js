const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-Auth');
const productController = require('../Controllers/products');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req,file,cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
    }
})

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({storage: storage,
     limits: {
    fileSize: 1024 * 1024 *5
},
fileFilter: fileFilter
});

router.get('/', productController.GET_ALL_Order);

router.post('/',checkAuth,upload.single('productImage'), productController.POST_New_Product);

router.get('/:productId',productController.GET_SELECTED_PRODUCT);

router.patch('/:productId', checkAuth, productController.Updated_Product);

router.delete('/:productId', checkAuth, productController.delete_Product);


module.exports = router;