const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const productController = require('../controllers/product');

router.post('/',upload.single('productImage'), productController.create);


router.get('/', productController.readAll);
router.get('/:productId', productController.read);
router.put('/:productId', upload.single('productImage'),productController.update);
router.delete('/:productId', productController.delete);

module.exports = router;