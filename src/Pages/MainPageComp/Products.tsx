import Right from './../../img/arrow-sm-right-svgrepo-com.svg';
import Left from './../../img/arrow-sm-left-svgrepo-com.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  ID_Usuario: number;
  Nome: string;
  Disponivel: number;
  Valor: number;
  Foto: string;
  Categoria: string;
  EmPromoção: boolean;
  PromoçãoDesc: number;
  ValorPromo: number;
}

function Products() {
  const [Product,setProduct] = useState<Product[]>()

  const [ProductArtesanalShow, setProductArtesanalShow] = useState<Product[]>([]);
  const [ProductCerealShow, setProductCerealShow] = useState<Product[]>([]);
  const [ProductVegetalShow, setProductVegetalShow] = useState<Product[]>([]);
  const [ProductFrutasShow, setProductFrutasShow] = useState<Product[]>([]);
  
  const [ArtCount, setArtCount] = useState<number>(1);
  const [CerCount, setCerCount] = useState<number>(1);
  const [VegCount, setVegCount] = useState<number>(1);
  const [FruCount, setFruCount] = useState<number>(1);
  const LimitProducts: number = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produtos');
        setProduct(response.data); 
        //Só pra pegar o useEffect
        setArtCount(0)
        setCerCount(0)
        setVegCount(0)
        setFruCount(0)
      } catch (err) {
        console.error('Erro:', err);
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    if(Product)
    setProductArtesanalShow(() => {
      const newArtesanalShow = Product.filter((product: Product) => product.Categoria === 'Artesanal').slice(ArtCount * LimitProducts, (ArtCount + 1) * LimitProducts);
      if (newArtesanalShow.length === 0) setArtCount(0);
      return newArtesanalShow;
    });
  }, [ArtCount]);

  useEffect(() => {
    if(Product)
    setProductCerealShow(() => {
      const newCerealShow = Product.filter((product: Product) => product.Categoria === 'Cereal').slice(CerCount * LimitProducts, (CerCount + 1) * LimitProducts);
      if (newCerealShow.length === 0) setCerCount(0);
      return newCerealShow;
    });
  }, [CerCount]);
  
  useEffect(() => {
    if(Product)
    setProductVegetalShow(() => {
      const newVegetalShow = Product.filter((product: Product) => product.Categoria === 'Vegetal')
        .slice(VegCount * LimitProducts, (VegCount + 1) * LimitProducts);
      if (newVegetalShow.length === 0) setVegCount(0);
      return newVegetalShow;
    });
  }, [VegCount]);
  
  useEffect(() => {
    if(Product)
    setProductFrutasShow(() => {
      const newFrutasShow = Product.filter((product: Product) => product.Categoria === 'Fruta')
        .slice(FruCount * LimitProducts, (FruCount + 1) * LimitProducts);
      if (newFrutasShow.length === 0) setFruCount(0);
      return newFrutasShow;
    });
  }, [FruCount]);
  

  const handleArrowClick = (category: string, direction: 'prev' | 'next') => {
    switch (category) {
      case 'Artesanal':
        if (direction === 'next') {
          setArtCount(prevCount => prevCount + 1);
        } else {
          setArtCount(prevCount => Math.max(0, prevCount - 1));
        }
        break;
      case 'Cereal':
        if (direction === 'next') {
          setCerCount(prevCount => prevCount + 1);
        } else {
          setCerCount(prevCount => Math.max(0, prevCount - 1));
        }
        break;
      case 'Vegetal':
        if (direction === 'next') {
          setVegCount(prevCount => prevCount + 1);
        } else {
          setVegCount(prevCount => Math.max(0, prevCount - 1));
        }
        break;
      case 'Fruta':
        if (direction === 'next') {
          setFruCount(prevCount => prevCount + 1);
        } else {
          setFruCount(prevCount => Math.max(0, prevCount - 1));
        }
        break;
    }
  };

  return (
    <>
       <ProductsShow
        title="Produtos artesanais direto da fazenda"
        productList={ProductArtesanalShow}
        onArrowClick={(direction) => handleArrowClick('Artesanal', direction)}
      />
      <ProductsShow
        title="Produtos cereal direto da fazenda"
        productList={ProductCerealShow}
        onArrowClick={(direction) => handleArrowClick('Cereal', direction)}
      />
      <ProductsShow
        title="Produtos Vegetal direto da fazenda"
        productList={ProductVegetalShow}
        onArrowClick={(direction) => handleArrowClick('Vegetal', direction)}
      />
      <ProductsShow
        title="Produtos frutas direto da fazenda"
        productList={ProductFrutasShow}
        onArrowClick={(direction) => handleArrowClick('Fruta', direction)}
      />
    </>
  );
}
interface ProductCategoryProps {
  title: string;
  productList: Product[];
  onArrowClick: (direction: 'prev' | 'next') => void;
}


const ProductsShow: React.FC<ProductCategoryProps> = ({ title, productList, onArrowClick}) => {
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

            if(Pass !== undefined){
              const Id = [...oldValue,Pass];
              localStorage.setItem('Values', JSON.stringify(Id));
            }
            } catch (error) {
              console.error("Erro", error);
          }
      }, [oldValue]);


  return (
    <div className="Product">
      <h1 className="Product__Title">{title}</h1>
      <div className="Product__List">
        <button className="Arrow" onClick={() => onArrowClick('prev')}>
          <img src={Left} alt="Seta esquerda" className="Arrow-Img" />
        </button>
        {productList.map((Produto: Product) => (
          <div className="Product__Card" key={Produto._id}>
            {Produto.EmPromoção ? <p className="Product__Card-Promo">{Produto.PromoçãoDesc}%</p> : ""}
            <img src={require(`./../../img/productImg/${Produto.Foto}`)} className="Product__Card-Img" alt={Produto.Nome} />
            <h1 className="Product__Card-Title">{Produto.Nome}</h1>
            <p className="Product__Card-Price">R$:{Produto.EmPromoção ? Produto.ValorPromo.toFixed(2) : Produto.Valor.toFixed(2)}</p>
            <button className="Product__Card-Btn" onClick={() => {setPass(() => Produto._id);}}>Comprar</button>
          </div>
        ))}
        <button className="Arrow" onClick={() => onArrowClick('next')}>
          <img src={Right} alt="Seta direita" className="Arrow-Img" />
        </button>
      </div>
   </div>
  );
};

export default Products;
