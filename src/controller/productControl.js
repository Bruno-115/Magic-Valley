const multer = require('multer');
const Produto = require('../Schema/produtosSchema')
const sharp = require('sharp')

const multerStorage = multer.memoryStorage();

const upload = multer({
    storage: multerStorage
})

exports.uploadPhoto = upload.single('photo');

exports.resizePhoto = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Sem arquivo enviado' });
        }
        const newPhotoname = req.file.filename = `produto-${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`src/img/productImg/${newPhotoname}`);
        res.status(200).json({newPhotoname})
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro no servidor' });
    }
};

exports.createProduct = async (req,res,next) => {
    try{
        const productData = req.body;
        productData.Disponivel = parseInt(productData.Disponivel);
        productData.Valor = parseFloat(productData.Disponivel);
        const product = new Produto(productData)
        await product.save()
        res.status(200);
    }catch(err){
        next(err)
    }
}

exports.getAllProducts = async (req,res) => {
    try {
        const allProducts = await Produto.find({});
        res.status(200).json(allProducts);
    } catch (err) {
       console.log(err)
    }
};

exports.searchProducts = async (req,res,next) => {
    try{
        const {Nome} = req.body;
        const productsList = await Produto.find({Nome})
        if(!productsList){
            return res.status(404)
        }
        return res.json(productsList)
    }catch(err){
        next(err);
    }
}

exports.buyProduct = async (req, res, next) => {
    try {
        const valueId = req.body; 
        const productList = await Produto.find({ _id: { $in: valueId } });
        if (!productList || productList.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        return res.json(productList);
    } catch (err) {
        next(err);
    }
}

exports.getOwnerProducts = async(req,res,next) => {
    try{
        const {ID_Usuario} = req.body;
        const productList = await Produto.find({ID_Usuario})
        if(!productList){
            return res.status(404)
        }
    return res.json(productList)
    }catch(err){
        next(err)
    }
}

exports.setPromotion = async (req,res,next) => {
    try{
        const {promoValue,idProduct}= req.body;
        const {promoDesc} = promoValue
        const updateProduct = await Produto.findById(idProduct)
        if(!updateProduct){
            return res.status(404).json("Produto não encontrado")
        }
        updateProduct.PromoçãoDesc = promoDesc
        updateProduct.EmPromoção = true
        const value = updateProduct.PromoçãoDesc / 100
        const calcPromo = updateProduct.Valor * value
        updateProduct.ValorPromo = updateProduct.Valor - calcPromo;
        await updateProduct.save();
        return res.status(200).json({updateProduct})
    }catch(err){
        next(err)
    }
}