const dotenv = require ('dotenv')
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const userRouter = require('./src/Router/userRouter')
const productRouter = require('./src/Router/productRouter')

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

const port = 5000;
app.use(cors());
app.use(express.json());
app.use('/',userRouter,productRouter)


mongoose.connect(DB).then(() => {
    console.log('sucesso')
    app.listen(port, () => {
        console.log(`Server está na porta ${port}`);
    });
}).catch((err) => console.error(err))






