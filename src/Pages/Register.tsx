import React, { useState } from "react"
import axios from 'axios'

interface FormValues {
    [key: string]: string;
    nome: string;
    email: string;
    senha: string;
    confirmaSenha: string;
    dataNascimento: string;
    rua: string;
    numero: string;
    estado: string;
    cep: string;
    complemento: string;
  }

function Register () {
    const [values,setValues] = useState<FormValues>({
        nome:'',
        email:'',
        senha:'',
        confirmaSenha:'',
        dataNascimento:'',
        rua:'',
        numero:'',
        estado:'',
        cep:'',
        complemento:''
    })
    const input = [
        {
            id: 1,
            name: "nome",
            type: "text",
            errorMessage: "O nome deve possuir no mínimo 3 caracteres e no máximo 64.",
            label: "Nome",
            pattern: "^[A-Za-zÀ-ú ]{3,64}$",
            required: true
          },
          {
            id: 2,
            name: "email",
            type: "email",
            errorMessage: "O email não é válido",
            label: "Email",
            pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
            required: true
          },
          {
            id: 3,
            name: "senha",
            type: "password",
            errorMessage: "Conter no mínimo 8 caracteres, uma letra maiúscula e um número.",
            label: "Senha",
            pattern: "^(?=.*[A-Z])(?=.*[0-9]).{8,}$", 
            required: true,
          },      
          {
            id: 4,
            name: "confirmaSenha",
            type: "password",
            errorMessage: "Senhas não são iguais",
            label: "Confirma senha",
            pattern: values.senha,
            required: true,
          },
          {
            id: 5,
            name: "dataNascimento",
            type: "date",
            label: "Data de Nascimento",
          },
          {
            id: 6,
            name: "rua",
            type: "text",
            errorMessage: "Deve ter o endereço",
            label: "Endereço",
            pattern: "^[A-Za-z0-9\\s.,'-]+$", 
            required: true
          },
          {
            id: 7,
            name: "numero",
            type: "number",
            label: "Numero",
            required: true
          },
          {
            id: 8,
            name: "estado",
            type: "text",
            label: "Estado",
            required: true,
            pattern: "^[A-Za-zÀ-ú ]{2,64}$", 
          },
          {
            id: 9,
            name: "cep",
            type: "text",
            errorMessage: "Insira o CEP",
            label: "CEP",
            required: true,
            pattern: "\\d{5}-\\d{3}" 
          },
          {
            id: 10,
            name: "complemento",
            type: "text",
            label: "Complemento",
          },
    ]
    const choose = [
      { id: 1, value: 'Acre' },
      { id: 2, value: 'Alagoas' },
      { id: 3, value: 'Amapá' },
      { id: 4, value: 'Amazonas' },
      { id: 5, value: 'Bahia' },
      { id: 6, value: 'Ceará' },
      { id: 7, value: 'Espírito Santo' },
      { id: 8, value: 'Goiás' },
      { id: 9, value: 'Maranhão' },
      { id: 10, value: 'Mato Grosso' },
      { id: 11, value: 'Mato Grosso do Sul' },
      { id: 12, value: 'Minas Gerais' },
      { id: 13, value: 'Pará' },
      { id: 14, value: 'Paraíba' },
      { id: 15, value: 'Paraná' },
      { id: 16, value: 'Pernambuco' },
      { id: 17, value: 'Piauí' },
      { id: 18, value: 'Rio de Janeiro' },
      { id: 19, value: 'Rio Grande do Norte' },
      { id: 20, value: 'Rio Grande do Sul' },
      { id: 21, value: 'Rondônia' },
      { id: 22, value: 'Roraima' },
      { id: 23, value: 'Santa Catarina' },
      { id: 24, value: 'São Paulo' },
      { id: 25, value: 'Sergipe' },
      { id: 26, value: 'Tocantins' },
      { id: 27, value: 'Distrito Federal' }
    ]

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[e.target.name]: e.target.value})
    }
    const limit:number = 5
    const [current,setCurrent] = useState<number>(0)
    const currentInputs = input.slice(current * limit , (current + 1) * limit )
    const [inputsCount, setInputsCount] = useState<number>(0);
    const [renderInput, setRenderInput] = useState<Boolean[]>([]);
    const [err,setErr] = useState<string[]>([])
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const checkInput = () => {
      if(inputsCount >= 5){
        setCurrent(1)
      }
    };
  const registerUser = async () => {
    try {
      await axios.post('http://localhost:5000/cadastro', values);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const possibleRegister = () => {
    if(inputsCount >= 9 ) {
    const addGreen = document.getElementById('saveBtn')
    addGreen?.classList.remove("Register__Save-Red")
    addGreen?.classList.add("Register__Save-Green")
    }else{
      const addGreen = document.getElementById('saveBtn')
      addGreen?.classList.add("Register__Save-Red")
      addGreen?.classList.remove("Register__Save-Green")
    }
  }
  const error = (id: number,errMessage:string) => {
    if(id == inputsCount){
      const updateErr = [...err]
      updateErr[id] = ""
      setErr(updateErr)
    }else{
      const updateErr = [...err]
      updateErr[id] = errMessage
      setErr(updateErr)
    }
  }
    const onChoose = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValues({ ...values, estado: e.target.value });
    };
    
    return( 
    <form className="Register__Form" onSubmit={handleSubmit}>
      <div className="Register__Inputs">
        {currentInputs.map((input) => (
          <div className="Register__Div" key={input.id}>
              {input.id === 8 ?
              <>
              <label className="Register__Label">{input.label}</label>
              <select required onChange={(e) => {
              onChoose(e);
              const newEstado = 8;
                 if (!renderInput[newEstado]) {
                   setRenderInput((prevRenderInput) => {
                   const newRenderInput: Boolean[] = [...prevRenderInput];
                    newRenderInput[newEstado] = true;
                    setInputsCount(inputsCount + 1);
                    return newRenderInput;
                  });
               }}} className="Register__Input">
                
                {choose.map((choose) => (
                    <option key={choose.id} value={choose.value}>{choose.value}</option>
                ))}
              </select>
              </> :<>
                <label className="Register__Label">{input.label}</label>
                <input
                    className="Register__Input"
                    onChange={(e) => {
                      onChange(e);
                      const pattern = input.pattern;
                      const testValue = e.target.value;
                      const regex = pattern ? new RegExp(pattern) : null;
                      const isValid = !pattern || (regex && regex.test(testValue));
                      const newIndex = input.id;
                      if (isValid && !renderInput[newIndex]) {
                          setRenderInput((prevRenderInput) => {
                              const newRenderInput: Boolean[] = [...prevRenderInput];
                              newRenderInput[newIndex] = true;
                              setInputsCount(inputsCount + 1);
                              return newRenderInput;
                          });
                      }else if(newIndex === 7 && e.target.value.length === 0 || newIndex === 9 && e.target.value.length === 0 ){
                        setRenderInput((prevRenderInput) => {
                          const newRenderInput: Boolean[] = [...prevRenderInput];
                          newRenderInput[newIndex] = false;
                          setInputsCount(inputsCount - 1);
                          return newRenderInput;
                        });
                      } 
                      else if (!isValid && renderInput[newIndex]) { 
                          setRenderInput((prevRenderInput) => {
                              const newRenderInput: Boolean[] = [...prevRenderInput];
                              newRenderInput[newIndex] = false;
                              setInputsCount(inputsCount - 1);
                              return newRenderInput;
                          });
                      }
                  }}
                  value={values[input.name]}
                  type={input.type}
                  name={input.name}
                  pattern={input.pattern}
                  required={input.required}
                  onBlur={() => {if(input.errorMessage)error(input.id,input.errorMessage)}}
                    />
                <span className="Register__Error">{err[input.id]}</span>
            </>}
            </div>
          ))}
          <p className="Register__Decoration1"></p>
          <p className="Register__Decoration2"></p>
         </div>
        {current > 0 ? <button className="Register__BtnBack" onClick={() => {setCurrent(0)}}>Voltar</button> : ""}
        {current === 0 ?<button className="Register__BtnNext" onClick={() => {checkInput()}}>Próximo</button>:<button id="saveBtn" className="Register__BtnNext Register__Save-Red " onMouseEnter={possibleRegister} onClick={() => {if(inputsCount >= 9)registerUser()}}>Salvar</button>}
    </form> 
    )
}

export default Register