import axios from 'axios';
import Logo from './../img/Icon.png'
import Search from './../img/magnifying-glass-svgrepo-com.svg'
import Icon from './../img/person-svgrepo-com.svg'
import Cart from './../img/cart-shopping-svgrepo-com.svg'
import usePassSearch from './AuxiliarComponents/passSearch'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'

function Nav () {
 const[login,SetLogin] = useState<Boolean>(false);
 const[input,setInput] = useState<string>('');
 const[userName,setUserName] = useState();
 const[userId,setUserId] = useState<object>({});
 const {searchValue,setSearchValue} = usePassSearch();
   const search = async (search: string) => {
      try{
        const searchInput = `{"Nome" : "${search.toLowerCase()}"}`
        const Data = JSON.parse(searchInput)
        const res = await axios.post('http://localhost:5000/procurarProduto',Data)
        setSearchValue(res.data);
      }catch(err){
        console.log(err)
      }
  }
  useEffect(() => {
    search(input);
  }, [input]);
  useEffect(() => {
    const Id = Cookies.get('ID_User')
    if(Id != undefined){
      SetLogin(true)
      setUserId({Id})
    }
  },[])
  useEffect(() => {
    const getName = async() => {
      try{
      const response = await axios.post('http://localhost:5000/nome', userId);
      const {userShowName} = response.data
      setUserName(userShowName)
    }catch(Err){
      console.log(Err)
    }
  }
  getName();
  },[userId])
    return(
    <div className='Nav'>
        <NavLink to='/' className="Nav__Header__Presentation">
            <img src={Logo} alt="Logo de uma fazenda" className="Nav__Header__Logo" />
            <h1 className="Nav__Header__Title">Magic Valley</h1>
        </NavLink>
        <div>
          <input type="text" className="Nav__Header__Search" onChange={(e) => {setInput(e.target.value)}}/> 
        <NavLink to='Search'> 
          <img src={Search} alt="Lupa" className="Nav__Header__Search-Icon" />
          <button className="Nav__Header__Search-Btn"></button>           
        </NavLink> 
        </div>
        <div>
         {!login ? 
         <div className='Nav__Header__DisplayState'>
            <NavLink to='Cadastro'className="Nav__Header__Container"> 
            <img src={Icon} alt="Pessoa"  className="Nav__Header__Icon"/>
            <a href="#" className="Nav__Header__Btn">Cadastrar</a>
            </NavLink> 
            <NavLink to='Login' className="Nav__Header__Container"> 
              <img src={Icon} alt="Pessoa"  className="Nav__Header__Icon"/>
              <a href="#" className="Nav__Header__Btn">Login</a>
            </NavLink> 
         </div> :
        <div className='Nav__Header__DisplayState'>
            <NavLink to='Login' className="Nav__Header__Container"> 
              <img src={Icon} alt="Pessoa"  className="Nav__Header__Icon"/>
              <p className="Nav__Header__Name">{userName}</p>
            </NavLink> 
        </div> 
         }
         <NavLink to='Cart' className="Nav__Header__Cart">
            <img src={Cart} alt="Carrinho" className="Nav__Header__Cart-Img" />
        </NavLink>
        </div>
    </div>
)
}

export default Nav;