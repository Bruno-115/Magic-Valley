const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: [true, 'É nescessario ter um nome']
    },
    email:{
        type: String,
        require:[true, 'É nescessario ter um email']
    },
    senha: {
        type:String,
        require: [true,'É nescessario ter uma senha']
    },
    confirmaSenha:{
        type:String,
        require: true,
    },
    dataNascimento: {
        type:Date,
        require:[true,'É nescessario colocar uma data de nascimento']
    },
    rua: {
        type:String,
        require:[true,'É nescessario colocar uma rua']
    },
    numero:{
        type:Number,
        require:[true,'É nescessario colocar um numero']
    },
    estado:{
        type:String,
        require:[true,'E nescessario colocar o estado']
    },
    cep:{
        type:String,
        require:[true,'E nescessario colocar um cep']
    },
    complemento: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;
