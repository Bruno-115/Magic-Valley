const Cookie = require('js-cookie')
const bcrypt = require ('bcrypt');
const User = require('../Schema/userSchema');

exports.singUp = async (req, res, next) => {
    try {
        const userData = req.body;
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(userData.senha.trim(), 10);
        userData.senha = hashedPassword;
        userData.confirmaSenha = hashedPassword;
        const user = new User(userData);
        await user.save();
        res.status(200);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.login = async (req,res,next) => {
    try{
        const {email,senha} = req.body;
        const user = await User.findOne({email}).select('+password')
        if(!user){
            return res.status(404)
        }
        const passwordMatch = await bcrypt.compare(senha.trim(),user.senha);
        if(!passwordMatch){
            return res.status(401)
        }
        const userId = user._id
        return res.json({userId})
    }catch(err){
        next(err);
    }
}

exports.userName = async (req,res,next) => {
    try{
        const {Id}= req.body;
        const user = await User.findOne({Id})
        const userShowName = user.nome
        res.status(200).json({userShowName})
    }catch(err){
        next(err)
    }
}

exports.userCart = async (req,res,next) => {
    try{
      
        const {Id}= req.body;
        const user = await User.findOne({Id})
        const userShowAdress = user.rua
        const userShowState = user.estado
        res.status(200).json({userShowAdress,userShowState})
    }catch(err){
        next(err)
    }
}
