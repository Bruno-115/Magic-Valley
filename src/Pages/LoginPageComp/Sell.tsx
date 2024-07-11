import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormData from 'form-data'
import Cookie from 'js-cookie'


function Sell() {
    interface productValue {
        [key: string]: string;
        ID_Usuario: string;
        Nome: string;
        Disponivel: string;
        Valor: string;
        Foto: string;
        Categoria: string;
    }
    const [productData, setProductData] = useState<productValue>({
        ID_Usuario: "",
        Nome: "",
        Disponivel: "",
        Valor: "",
        Foto: "",
        Categoria: "",
    });
    const input = [
        {
            id: 1,
            name: "Nome",
            type: "text",
            placeholder: "Nome do produto",
            label: "Nome",
            required: true,
            pattern: "^[A-Za-zÀ-ú ]{2,64}$",
            errorMessage: "Coloque o nome do produto",
        },
        {
            id: 2,
            name: "Disponivel",
            type: "number",
            placeholder: "Quantidade Disponivel",
            label: "Disponivel",
            required: true,
            errorMessage: "Coloque a quantidade disponivel",
        },
        {
            id: 3,
            name: "Valor",
            type: "number",
            placeholder: "Valor da unidade",
            label: "Valor",
            required: true,
            errorMessage: "Coloque o valor do produto",
        },
    ];
    const option = [
        {
            id: 1,
            value: "",
        },
        {
            id: 2,
            value: "Fruta",
        },
        {
            id: 3,
            value: "Cereal",
        },
        {
            id: 4,
            value: "Vegetal",
        },
        {
            id: 5,
            value: "Artesanal",
        }
    ];
    const [selectedFile, setSelectedFile] = useState<File>();
    const [photoUpload, setPhotoUpload] = useState<boolean>(false);
    const [productReady, setProductReady] = useState<boolean>(false);
    useEffect(() => {
        const userId = Cookie.get('ID_User')
        if(userId){
            setProductData({...productData,ID_Usuario:userId})
        }     
    },[])
    const handleUpload = async () => {
        try {
            const foto = new FormData();
            foto.append('photo', selectedFile); 
            const response = await axios.post('http://localhost:5000/enviarFoto',foto);
            const photoName = response.data.newPhotoname
            setProductData({...productData, Foto: photoName});
            setPhotoUpload(true) 
       } catch (err) {
            console.error('Erro:', err);
       }
    };

    const Submit = async() => {
        try{
            const lowerName = productData.Nome
            productData.Nome = lowerName.toLowerCase();
            const response = await axios.post('http://localhost:5000/criarProduto',productData);
            console.log('sucesso')
        }catch(err){
            console.log(err)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const onChoose = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductData({ ...productData, Categoria: e.target.value });
    };

    useEffect(() => {
        const fillDatas = Object.values(productData).every(value => value !=="")
        if(fillDatas){
            setProductReady(true)
        }
    },[productData])

    return (
        <div className="DispalyContent" onSubmit={(e) => e.preventDefault()}>
        <div className="Sell__Background"/>
        <div className="Sell">
            <div className='Sell__Photo'>
                    <input type="file" onChange={(e) => {if(e.target.files)setSelectedFile(e.target.files[0])}} className='Sell__InputPhoto'/>
                    {selectedFile ? <button className='Sell__PhotoBtn' onClick={handleUpload}>Upload</button> : ''}
            </div>
                {input.map((inputItem) => (
                    <input
                        key={inputItem.id}
                        value={productData[inputItem.name]}
                        type={inputItem.type}
                        onChange={onChange}
                        className="Sell__Name"
                        placeholder={inputItem.placeholder}
                        name={inputItem.name}
                    />
                ))}
                <select required onChange={(e) => onChoose(e)} className='Sell__Option'>
                    {option.map((optionItem) => (
                        <option key={optionItem.id} value={optionItem.value}>{optionItem.value}</option>
                    ))}
                </select>
                {productReady ? <button type="button" onClick={Submit} className="Sell__Submit" >
                    Enviar dados
                </button> : <p className="Sell__Error">Faltando informação</p>} 
            </div>
        </div>
    );
}

export default Sell;
