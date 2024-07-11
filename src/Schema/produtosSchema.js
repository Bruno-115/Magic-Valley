const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    ID_Usuario:{
        type:String,
        require:[true,'É nescessario ter um ID do vendedor']
    },
    Nome: {
        type:String,
        require:[true,'É nescessario ter o nome do produto']
    },
    Disponivel: {
        type:Number,
        require: [true,'É nescessario ter uma quantidade']
    },
    Valor:{
        type:Number,
        require: [true, 'É nescessario ter um valor']
    },
    Foto:{
        type:String,
        require:[true,'É nescessario ter uma foto']
    },
    Categoria: {
        type:String,
        require:[true,'É nescessario ter uma categoria'],
    },
    EmPromoção: Boolean,
    PromoçãoDesc: Number,
    ValorPromo: Number
})

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
