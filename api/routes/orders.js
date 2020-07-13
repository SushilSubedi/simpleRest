const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-Auth');
const orderController = require('../Controllers/Order');

//order router

router.get('/',checkAuth ,orderController.get_All_Product);

router.post('/',checkAuth ,orderController.post_All_Product);

router.get('/:orderId',checkAuth ,orderController.get_Selected_Order);

router.delete('/:orderId', checkAuth ,orderController.Delete_Selected_Order);


module.exports = router;





