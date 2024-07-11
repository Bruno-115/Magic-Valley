import Img1 from './../../img/Icon.png'
import Img2 from './../../img/img-2-1.png'

import Right from './../../img/arrow-sm-right-svgrepo-com.svg'
import Left from './../../img/arrow-sm-left-svgrepo-com.svg'

import { useEffect,useState } from 'react'

function Panel (){
    const [Number,SetNumber] = useState<Number>(1);
    const [NextNumber,SetNextNumber] = useState<Number>(1);
   
    useEffect(() => {
        let current = document.getElementById(`Panel-${Number}`);
        let next = document.getElementById(`Panel-${NextNumber}`);
        current?.classList.remove("Panel__Display-Active");
        next?.classList.add("Panel__Display-Active"); 
        SetNumber(NextNumber);
        if(Number === 0 ){SetNextNumber(6);}
        if(Number === 7 ){SetNextNumber(1);}
    }, [NextNumber, Number]);
    return( 
    <div className="Panel">

        <div id='Panel-1' className="Panel__Display  Panel__Display-Active">
                <img src={Img1} alt='Espantalho' className="Panel__Img-1" />
                <p className="Panel__Text-1">Bem-vindo ao Magic Valley, o seu destino mágico para produtos frescos e autênticos, diretamente das fazendas. Embarque em uma jornada de variedades incríveis, onde a magia do campo se entrelaça com a excepcional qualidade dos produtos cultivados por nossos fazendeiros. Explore conosco essa experiência única, celebrando a autenticidade e o frescor que só o Magic Valley pode oferecer.</p>
                <div className="Panel__Display-1"></div>
        </div>

        <div id='Panel-2' className="Panel__Display">     
                <p className="Panel__Text-2">Grande promoção de abertura, até <span className='Panel__Text-Highlight'>60% de desconto</span> em todos os produtos da loja</p>
                <img src={Img2} alt='Galinha,melancia e outros produtos' className="Panel__Img-2" />
                <div className="Panel__Display-2"></div>
        </div>

        <div id='Panel-3' className="Panel__Display">
                <p className="Panel__Text-3">Frutas variadas na promoção</p>
                <p className="Panel__Text-3-1">Com até <span className='Panel__Text-Highlight'>60% de desconto</span></p>
                <div className="Panel__Display-3 Panel__Display-Config"></div>
        </div>

        <div id='Panel-4' className="Panel__Display">
                <p className="Panel__Text-4">Produs artesanais variadas na promoção</p>
                <p className="Panel__Text-4-1">Com até <span className='Panel__Text-Highlight'>60% de desconto</span></p>
                <div className="Panel__Display-4 Panel__Display-Config" />
        </div>

        <div id='Panel-5' className="Panel__Display">
                <p className="Panel__Text-5">Cereais variadas na promoção</p>
                <p className="Panel__Text-5-1">Com até <span className='Panel__Text-Highlight'>60% de desconto</span></p>
                <div className="Panel__Display-5 Panel__Display-Config "> </div>
        </div>

        <div id='Panel-6' className="Panel__Display">
                <p className="Panel__Text-6">Vegetais variadas na promoção</p>
                <p className="Panel__Text-6-1">Com até <span className='Panel__Text-Highlight'>60% de desconto</span></p>
                <div className="Panel__Display-6 Panel__Display-Config "> </div>

        </div>

        <button onClick={() => SetNextNumber((prevNextNumber) => (prevNextNumber as number) - 1)} className="Panel__Arrow Panel__Arrow-left">
            <img src={Left} alt="Seta esquerda" className="Arrow" />
        </button>

        <button onClick={() => SetNextNumber((prevNextNumber) => (prevNextNumber as number) + 1)} className="Panel__Arrow Panel__Arrow-right">
            <img src={Right} alt="Seta direita" className="Arrow" />
        </button>
        <div className="Panel__BtnDiv">
        <button className="Panel__Btn" onClick={() => {SetNextNumber(1)}}></button>
        <button className="Panel__Btn" onClick={() => {SetNextNumber(2)}}></button>
        <button className="Panel__Btn" onClick={() => {SetNextNumber(3)}}></button>
        <button className="Panel__Btn" onClick={() => {SetNextNumber(4)}}></button>
        <button className="Panel__Btn" onClick={() => {SetNextNumber(5)}}></button>
        <button className="Panel__Btn" onClick={() => {SetNextNumber(6)}}></button>
        </div>
    </div>
)
}

export default Panel;