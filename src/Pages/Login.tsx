import { NavLink, Outlet } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie'


function LoginUser() {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loged, setLoged] = useState<boolean>(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, senha });
            const userIdResponse = response.data.userId; 
            const userId = userIdResponse.substring(1, userIdResponse.length - 1);
            Cookie.set('ID_User', userId,{expires: 3})
            setLoged(false)
        } catch (err) {
                if (err instanceof Error) {
                    if(err.message.includes('401') || err.message.includes('404')){
                        setError('e-Mail ou senha incorreta')}
                }}
    };
 
    useEffect(() => {
        const checkCookie = Cookie.get('ID_User')
        console.log(checkCookie)
        if(checkCookie != undefined){
            setLoged(true)
        }
    },[])
    return (
        <>
            {!loged ?
                <div className="Login__Panel">
                    <div className="Login__Background"/>
                    <div className="Login__Inputs">
                        <label className="Login__Label">Email</label>
                        <input placeholder='e-Mail' type="email" value={email} onChange={e => setEmail(e.target.value)} className='Login__Input' />
                        <label className="Login__Label">Senha</label>
                        <input placeholder='Senha' type="password" value={senha} onChange={e => setSenha(e.target.value)} className='Login__Input' />
                        <p className="Login__Error">{error}</p>
                        <button onClick={handleLogin} className="Login__Btn">Logar</button>
                    </div>
                </div>
                :
                <div className="Login__Menu">
                    <NavLink to="Historico" className="Login__Btns">Histórico</NavLink>
                    <NavLink to="Vender" className="Login__Btns">Vender</NavLink>
                </div>
            }
            <Outlet />
        </>
    );
}

export default LoginUser;
