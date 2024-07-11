const express = require('express')
const router = express.Router();
const product = require('../controller/productControl')

router.post('/criarProduto',product.createProduct)
router.get('/produtos',product.getAllProducts)
router.post('/comprarProduto',product.buyProduct);
router.post('/procurarProduto',product.searchProducts)
router.post('/enviarFoto',product.uploadPhoto,product.resizePhoto);
router.post('/historico',product.getOwnerProducts)
router.post('/promocao',product.setPromotion)

module.exports = router;