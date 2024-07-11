import Right from './../img/arrow-sm-right-svgrepo-com.svg';
import Left from './../img/arrow-sm-left-svgrepo-com.svg';
import trash from './../img/trash-bin-trash-svgrepo-com.svg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Product {
  _id: string;
  ID_Usuario: number;
  Nome: string;
  Disponivel: number;
  Valor: number;
  Foto: string;
  Estrelas: number;
  Categoria: string;
  EmPromoção: boolean;
  PromoçãoDesc: number;
  ValorPromo: number;
}
  
  function Cart() {
    const [productList, setProductList] = useState<Product[]>();
    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
    const [productListDisplay, setProductListDisplay] = useState<Product[]>([]);
    const [updateIds, setUpdateIds] = useState<string[]>([]);
    const [adress, setAdress] = useState<string>();
    const [estado, setEstado] = useState<string>();
    const [payValue,setPayValue] = useState<number>(0);
    const [count,setCount] = useState<number[]>([]);
    const [numberShow,setNumberShow] = useState<number>(1);
    const [userId,setUserId] = useState<object>({});
    const limit:number = 4;

    useEffect(() => {
      const getProducts = JSON.parse(localStorage.getItem('Values') || '[]');
      setUpdateIds(getProducts);
    }, []);

    useEffect(() => {
      console.log('teste')
      const setProducts = async() => {
        try{
          const valueId = updateIds;
          if(updateIds.length === 0) {
            setProductList([])
          }
          const res = await axios.post('http://localhost:5000/comprarProduto',valueId); 
          setProductList(res.data)
        }catch(err){
          console.log(err)
        }
      }
      setProducts();
    }, [updateIds]);

    useEffect(() => {
      const getData = async() => {try{
        const Id = Cookies.get('ID_User')
        if(Id){
        setUserId({Id})
        const res = await axios.post('http://localhost:5000/userCart',userId)
        const {userShowAdress} = res.data;
        const {userShowState} = res.data;
        setAdress(userShowAdress);
        setEstado(userShowState)
        }
      }catch(err){
        console.log(err)
      }}
      getData();
    },[])

    useEffect(() => {
      if (productList) {
        setProductListDisplay(() => {
          const testArray = Object.entries(productList);
          const productShow = testArray
            .slice((numberShow - 1) * limit, numberShow * limit)
            .map(([_, product]) => product); 
          return productShow;
        });
      }
    }, [productList, numberShow]); 

    useEffect(() => {
      let length: number = updateIds.length;
      let countDown:number = 0
      let setArray:number[] = []
      for (let i = 0; i < length; i += 4) {
        countDown++;
        setArray = [...setArray , countDown]
        setCount(setArray)
      }
    }, [updateIds]);
        
    useEffect(() => {
      let total = 0;
      productListDisplay.forEach(Produto => {
        total += Produto.EmPromoção ? Produto.ValorPromo : Produto.Valor;
      });
      setPayValue(total);
    }, [productListDisplay]);

    function updateQuantity(id: string, direction: 'plus' | 'minus', limitQuantity: number, value: number, valuePromo: number, inPromo:boolean) {
        setQuantities((prevQuantities) => {
          const currentQuantity = prevQuantities[id] || 1;
          let newQuantity: number = currentQuantity;
          if (direction === 'plus' && currentQuantity < limitQuantity) {
            newQuantity = currentQuantity + 1;
            inPromo ? setPayValue(payValue + valuePromo) :
            setPayValue(payValue + value )
          } else if (direction === 'minus') {
            newQuantity = Math.max(currentQuantity - 1, 1);
            const belowOne = currentQuantity - 1;
            if(inPromo && payValue > valuePromo && belowOne > 0){
              setPayValue(payValue - valuePromo)
            }
            else if(payValue > value && belowOne > 0){
              setPayValue(payValue - value )
            }
          }
          const newQuantities = { ...prevQuantities, [id]: newQuantity };
          return newQuantities;
        });
      }
    

      function trashCan(id: string) {
        if (productList) {
          const updated: string[] = updateIds.filter((currentId: string) => currentId !== id);
          setUpdateIds(updated)
          localStorage.setItem('Values', JSON.stringify(updated));
        }
      }
 
    return (
      <div className="Cart">
        <div className="Cart__Background"></div>
        <div className="Cart__List">
           {productListDisplay.map((Produto: Product) => (
              <div className="Cart__Product" key={Produto._id}>
                <img src={require(`./../img/productImg/${Produto.Foto}`)} alt="" className="Cart__Product-Img" />
                <h1 className="Cart__Product-Name">{Produto.Nome}</h1>
                <h2 className="Cart__Product-Price">R${Produto.EmPromoção ? Produto.ValorPromo.toFixed(2) : Produto.Valor?.toFixed(2)}</h2>
                <div className="Cart__Product-Quantity">
                  <button className="Cart__Product-Btn" onClick={() => updateQuantity(Produto._id, 'minus', Produto.Disponivel, Produto.Valor,Produto.ValorPromo,Produto.EmPromoção)}>
                    <img src={Left} alt="" className="Cart__Product-Arrow" />
                  </button>
                  <p className="Cart__Product-Number">{quantities[Produto._id] || 1}</p>
                  <button className="Cart__Product-Btn" onClick={() => updateQuantity(Produto._id, 'plus', Produto.Disponivel, Produto.Valor,Produto.ValorPromo,Produto.EmPromoção)}>
                    <img src={Right} alt="" className="Cart__Product-Arrow" />
                  </button>
                  <p className="Cart__Product-Left">Disponivel: {Produto.Disponivel}</p>
                </div>
                <img src={trash} onClick={() => trashCan(Produto._id)} className="Cart__Product-Remove" />
                <p className="Cart__Product-Decoration1"></p>
                <p className="Cart__Product-Decoration2"></p>
              </div>
            ))}
          <div className="Cart__Product-Numbers">
          {count.map((countDown) => (
          <button key={countDown} className="Cart__Product-ListNumber" onClick={() => setNumberShow(countDown)}>
            {countDown}
          </button>
          ))}
          </div> 
        </div>
        <div className="Cart__Panel">
          <h1 className="Cart__Panel-Title">Informações:</h1>
          <div className="Cart__Panel-TextDisplay">
            <p className="Cart__Panel-Text">Estado:{estado}</p>
            <p className="Cart__Panel-Text">Endereço:{adress}</p>
          </div>
          <div className="Cart__Panel-DisplayValue">
            <p className="Cart__Panel-Value">Valor total:</p>
            <p className="Cart__Panel-Value">R${payValue.toFixed(2)}</p>
          </div>
          <button className="Cart__Panel-Btn">Comprar</button>
        </div>
      </div>
    );
  }

  
  export default Cart;