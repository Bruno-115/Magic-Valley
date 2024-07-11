import { useState,useEffect } from "react"
import axios from "axios"
import cookie from "js-cookie"
  
function Historic () {
    interface Product {
        _id: string;
        ID_Usuario: number;
        Nome: string;
        Disponivel: number;
        Valor: number;
        Foto: string;
        Categoria: string;
        EmPromoção: boolean,
        PromoçãoDesc: number,
        ValorPromo: number
    }

    const [idUser,setIdUser] = useState<object>({})
    const [Product,setProduct] = useState<Product[]>()
    const [promoValue,setPromoValue] = useState<object>();
    const [promotion,setPromotion] = useState<string>()
    const [error,setError] = useState<Error>()
    useEffect(() => {
        const ID_Usuario = cookie.get('ID_User')
        if(ID_Usuario){
        setIdUser({ID_Usuario})
        }
    },[])

    useEffect(() => {
        const getHist = async() => {
            const response = await axios.post('http://localhost:5000/historico',idUser)
            if(response){
                setProduct(response.data)
            }
        }
        getHist()
    },[idUser])
    const postPromo = async (idProduct:string) => {
        try{
        const value = { promoValue, idProduct };
        console.log(value)
        const response = await axios.post('http://localhost:5000/promocao',value)
        console.log(response.data)
    }catch(err){
       console.log(err)
    }
    }

    return (
        <div className="DispalyContent">
            <div className="Historic__Product">
            <div className="Historic__Background" />
                <h1 className="Historic__Title">Produtos a venda</h1>
                {Product?.map((Produto: Product) => (
                    <>
                    <div className="Historic__Product-Info" key={Produto._id}>
                        <img src={require(`../../img/productImg/${Produto.Foto}`)} alt="fodase" className="Historic__Product-Photo" />
                        <h1 className="Historic__Product-Title">{Produto.Nome}</h1>
                        <p className="Historic__Product-Quantity">Disponivel: {Produto.Disponivel}</p>
                        <p className="Historic__Product-Value">R${Produto.Valor.toFixed(2)}</p>
                        <button onClick={() => setPromotion(Produto._id)} className="Historic__Product-Btn">↓</button>
                    </div> 
                    {promotion == Produto._id ?<div className="Historic__Product-Promotion">  
                        <label className="Historic__Product-Label">Valor da porcentagem: </label>
                        <input type="number" className="Historic__Product-Input" onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPromoValue({"promoDesc": e.target.value})} />
                        <button onClick={() => postPromo(Produto._id)} className="Historic__Product-SendBtn">enviar</button>
                    </div> : ""}
                </>
                ))} 
            </div>
        </div>   
        )
}
export default Historic