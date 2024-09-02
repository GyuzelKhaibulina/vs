"use client";
import React, { useState} from "react";
import { usePathname, useRouter } from 'next/navigation'
import KeyRandome from '@/app/services/key_random_service/page';
import '../../styles-auth.css';
import Meta from '@/app/components/meta/page';


const CheckCode = () => {
    const path = process.env.PATH_API;    
    const router = useRouter();
    
    const location = usePathname();    
    const userEmail = location.split("/")[2];
    const [keyLink, setKeyLink] = useState (KeyRandome(26)); // ключ который записывается во время записи юзера в базу

    const [inputs, setInputs] = useState({
        email: userEmail,
        username: userEmail,
        code: "",
        saved_recipes: '{"saved":[]}'
      });

      const [error, setError] = useState ({
          code : true,
          user: true
      })

    const handleSubmit = async() => {    
        // проверка соответствия юзера и кода            
        fetch(`${path}login/temp_register`, {
            method: "POST",
            body: JSON.stringify(inputs),
        }).then((data) => {
            if (data.status===200)
            {
                // setError((prev) => ({ ...prev, code: true }));
                // запись в базу зареганных юзеров с кей линк
                fetch(`${path}login/add_user`, {
                        method: "POST",
                        body: JSON.stringify({keyLink, userEmail})
                    }).catch((err) => {                                
                        console.log(err);
                        setError((prev) => ({ ...prev, user: false }));
                }); 
                // переход по ссылке с кей линк
                router.push(`/register/${userEmail}/${keyLink}`)
            }
            else { setError((prev) => ({ ...prev, code: false }));console.log ("error");}
        }).catch((err) => {                                
                console.log("err", err);
                
        });    
      };

    const handleChange = (e) => {
        inputs.code = e.target.value;
    };


  return (
    <>     
    <Meta robots="noindex"/>  
    <div className="loginHeight">
        <div className='wrapLogin'>
            <div className='loginForm'>
                <div className='loginHeader'>
                    <img src="../logo-circle.png" loading="lazy" alt="vseresepty.ru cooking recipes login" />
                    <h3>Вceрецепты</h3>
                </div>        
                        <form>
                            <div className='pdT10'>
                                <div className='inputResetEmail'>
                                    <input required type="text" placeholder="код из письма" name="code" onChange={handleChange} /> 
                                </div>
                            </div>   
                        </form>       
                        {!error.code && <div className='loginError'>Не верный код.</div>}      
                        <div className='loginButton'>
                            <button type="submit" onClick={handleSubmit}>Отправить</button> 
                        </div>
            </div>
        </div>
    </div></>
  );
}
export default CheckCode;