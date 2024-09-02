"use client";
import React, { useContext, useEffect, useState} from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link';
import './../styles-auth.css';
import { AuthContext } from '@/context';
import Meta from '@/app/components/meta/page';


const ResetPassword = () => {
    const path = process.env.PATH_API;    
    const router = useRouter();
    const {auth} = useContext (AuthContext);  
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const key = searchParams.get('key');

 
    const [inputs, setInputs] = useState({
        email: email,
        password: "",
        passwordRepeat: "",
}); 

      const [error, setError] = useState ({
          code : "",
          user: true,
          coincidence: true, // совпадение паролей
          language: true, //английская раскладка
          spaces: true,  // пробелы
          short: true,   // короткий пароль
          specialСhar: true,  // спец символы
          number: true,  // цифра
      })

      useEffect(() => 
      { 
         async function getUser() {
            const res = await fetch(`${path}account/check_key?email=${email}&key=${key}`, {
                method: "GET",
            })                
                return res.json().then((data) => {
                    if (data[0]?.email) {
                        setError((prev) => ({ ...prev, code: true }));
                    }
                    else {
                        setError((prev) => ({ ...prev, code: false }));
                    } 
            }).catch((err) => {
                console.log(err);
            });
        }
        getUser();
      },[auth])

      useEffect (() => {
        if (inputs.password===inputs.passwordRepeat)
        {
            setError((prev) => ({ ...prev, coincidence: false}));
        }
        else {
            setError((prev) => ({...prev, coincidence: true}));
        }
        if (inputs.password.length>5)
        {
            setError((prev) => ({...prev, short: false}));
        }
        else 
        {
            setError((prev) => ({...prev, short: true}));
        }
        if ( /\s/.test(inputs.password)) {
            setError((prev) => ({...prev, spaces: true}));
        }
        else {
            setError((prev) => ({...prev, spaces: false}));
        }
        if (/[^A-Za-z0-9]/.test(inputs.password)) {
            setError((prev) => ({...prev, specialСhar: false}));
        }
        else {
            setError((prev) => ({...prev, specialСhar: true}));
        }
        if (/\d/.test(inputs.password)) {
            setError((prev) => ({...prev, number: false}));
        }
        else {
            setError((prev) => ({...prev, number: true}));
        }
        if (/[A-Za-z]/.test(inputs.password)) {
            setError((prev) => ({...prev, language: false}));
        }
        else {
            setError((prev) => ({...prev, language: true}));
        }           
   }, [inputs])


   const handleSubmit = async() => {    
        if (((!error.coincidence)&&(!error.short)&&(!error.spaces)&&(!error.number)&&(!error.language)))         
        {        
            fetch(`${path}account/reset_password?email=${email}`, {
                method: "PUT",
                body: JSON.stringify(inputs)
            }).then((data) => {
                if (data.ok) {
                    router.push("/login"); 
                }               
            }).catch((err) => {                                
                    console.log("err", err);                    
            });  
        }
            else { setError((prev) => ({ ...prev, user: false }));console.log ("error");}          
      };


  const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };


  return (
    <div className="loginHeight"> 
        <Meta robots="noindex"/>        
        {error.code &&
            <div className="wrapLogin">
                <div className="loginForm">
                    <div className="loginHeader">
                        <img src="./img/logo-circle.png" loading="lazy" alt="vseresepty.ru cooking recipes reset password" />
                        <h3>Вceрецепты</h3>
                    </div>           
                    <h4>Придумайте пароль минимум 6 символов: </h4>             
                        <form className='mr-b-25'>
                            <div className="inputResetEmail">
                                <input required type="email"  value={email} /> 
                            </div>   
                            <div className="inputResetPassw">
                                <input required type="password" placeholder="Введите новый  пароль" name="password" onChange={handleChange} /> 
                            </div>                       
                            <div className="pdT10"></div>
                            <div className="inputResetPassw">
                                <input required type="password" placeholder="Повторите пароль" name="passwordRepeat" onChange={handleChange} />
                            </div>
                            {error.coincidence && <div className="loginError">Пароли не совпадают</div>}    
                            {error.short && <div className="loginError">Пароль должен быть не менее 6 символов</div>}    
                            {error.spaces && <div className="loginError">Пароль не должен содержать пробелы</div>}           
                            {error.specialСhar && <div className="loginError">Пароль должен содержать спецсимвол</div>}  
                            {error.number && <div className="loginError">Пароль должен содержать цифру</div>} 
                            {error.language && <div className="loginError">Используйте английскую раскладку</div>} 
                        </form>  
                        {((!error.coincidence)&&(!error.short)&&(!error.spaces)&&(!error.number)&&(!error.language)) &&                     
                            <div className="loginButton">
                                <button type="submit" onClick={handleSubmit}>Сохранить</button> 
                                {!error.user && <div className="loginError">Ошибка запроса. Попробуйте еще раз.</div>}
                            </div>                           
                        }
                </div>
            </div>
        }
        {!error.code && <div className="wrapLogin">Ссылка не верна</div>}
    </div>     
  );
}
export default ResetPassword;