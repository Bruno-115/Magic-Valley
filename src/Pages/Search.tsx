import {useEffect,useState } from 'react';

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

function SearchProduct() {
  const [searchValue,setSearchValue] = useState<Product[]>([]);

  useEffect(() => {
    const searchResult = localStorage.getItem('Search');
    console.log('teste',searchResult)
    if(searchResult){
    const  productsList  = JSON.parse(searchResult);
    console.log('b',productsList)
    setSearchValue(productsList);
    console.log('a',productsList)
    }
  }, []);

  const [Pass, setPass] = useState<string>();
      const [oldValue, setOldValue] = useState<string[]>([]);
      useEffect(() => {
          try {
              const storedValues = JSON.parse(localStorage.getItem('Values') || '');
              setOldValue(storedValues);
          } catch (error) {
              console.error("Erro:", error);
          }
      }, [Pass]);
      
      useEffect(() => {
          try {
            if(Pass != undefined){
              const Id = [...oldValue,Pass];
              localStorage.setItem('Values', JSON.stringify(Id));
            }
            } catch (error) {
              console.error("Erro", error);
          }
      }, [oldValue]);
  return (
    <div>
      {searchValue ? searchValue.map((Produto: Product) => (
        <div className="Product__Card" key={Produto._id}>
          {Produto.EmPromoção ? <p className="Product__Card-Promo">{Produto.PromoçãoDesc}%</p> : ""}
          <img src={require('../img/productImg/' + Produto.Foto)} className="Product__Card-Img" alt={Produto.Nome} />
          <h1 className="Product__Card-Title">{Produto.Nome}</h1>
          <p className="Product__Card-Price">R$:{Produto.EmPromoção ? Produto.ValorPromo.toFixed(2) : Produto.Valor.toFixed(2)}</p>
          <button className="Product__Card-Btn" onClick={() => {setPass(() => Produto._id);}}>Comprar</button>
        </div>
      )) : ""}
    </div>
  );
}

export default SearchProduct;
