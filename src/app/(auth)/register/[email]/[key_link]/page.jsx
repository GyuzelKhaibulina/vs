"use client";
import React, { useState, useContext, useEffect} from "react";
import { usePathname, useRouter } from 'next/navigation';
import '../../../styles-auth.css';
import Meta from '@/app/components/meta/page';

const Register = () => {
    
    const path = process.env.PATH_API;    
    const url = process.env.URL;
    const router = useRouter();
    const location = usePathname();
    const email = location.split("/")[2];
    const key = location.split("/")[3];    
    const [user, setUser] = useState(false);
    const [errorKey, setErrorKey] = useState(true);
  
    const [inputs, setInputs] = useState({
            email: email,
            password: "",
            passwordRepeat: "",
    }); 
  
    const [error, setError] = useState({
             coincidence: true,
             language: true, //английская раскладка
             spaces: true,  // пробелы
             short: true,   // короткий пароль
             specialСhar: true,  // спец символы
             number: true,  // цифра
             userEmail: true  // совпадение с почтой юзера
         }
    ); 

     useEffect(() => {
        // проверка на совпадение ключа из ссылки и ключа из базы
        fetch(`${path}login/register?&email=${email}&key=${key}`, {
            method: "GET",
        }).then((data) => {            
            if (data.status===200)
            {                
                setErrorKey(true);
                // переход по ссылке с кей линк
                router.push(`/register/${userEmail}/${keyLink}`);
            }
            else { setErrorKey(false);}
        }).catch((err) => {                                
                console.log(err);                
        });         


   }, [location] )

    

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
 
    
    const handleChange = (e) => {
         setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async() => {                
        if (!error.coincidence && !error.short && !error.spaces && !error.specialСhar && !error.number && !error.language)
             {
                // удаляется key_link у юзера
                fetch(`${path}login/temp_register`, {
                    method: "PATCH",
                    body: JSON.stringify({email}),
                }).then((data) => {       
                    if (data.status===200)
                        {      
                            // меняем временный пароль н пароль юзера
                            fetch(`${path}login/register`, {
                                method: "PUT",
                                body: JSON.stringify(inputs),
                            }) 
                            .then((data) => {
                                if (data.status===200) {
                                    // переход по ссылке на форму логина
                                    setUser(false)
                                    router.push("/login"); 
                                    }
                                else {setUser(true)}
                            })                        
                        }                    
                    else { setErrorKey(false);}
                }).catch((err) => {                                
                        console.log(err);                
                });      
             } 
        else {
              console.log ("error");
             }
       };

  return (
    <>      
    <Meta robots="noindex"/> 
    <div className="loginHeight">
        <div className="wrapLogin">
            <div className="loginForm">
                <div className="loginHeader">
                    <img src="../logo-circle.png" loading="lazy" alt="vseresepty.ru register" />
                    <h3>Вceрецепты</h3>
                </div>
                {errorKey && <> 
                    <h4>Придумайте пароль минимум 6 символов: </h4>             
                        <form>
                            <div className="inputResetEmail">
                                <input disabled type="email"  value={email} onChange={handleChange} /> 
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
                            {user && <div className="loginError">Юзер не найден</div>}
                        </form>                       
                        <div className="loginButton">
                            <button type="submit" onClick={handleSubmit}>Сохранить</button> 
                        </div>                  
                     
                     </>}
                    {!errorKey && <div className="sendEmail">Ссылка не действительна.</div>} 
            </div>
        </div>
    </div></>
  );
}
export default Register;