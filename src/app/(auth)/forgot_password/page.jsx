"use client";
import React, { useEffect, useState} from "react";
import { useSession } from 'next-auth/react';
import KeyRandome from '@/app/services/key_random_service/page';
import { Modal } from '@/app/components/modal/Modal';
import '../styles-auth.css';
import Meta from '@/app/components/meta/page';


const CheckCode = () => {
    const path = process.env.PATH_API;    
    const [modal, setModal] = useState(false);
    const session = useSession();
    const [email, setEmail] = useState();
    const [error, setError] = useState ({
        emailFormat: "",
        emptyEmail: "",
        wrongQuery: true,
        userExist: true
    });
    const [emailSent, setEmailSent] = useState(false);
    const [errEmailSent, setErrEmailSent] = useState(true);
    const [emailParam, setEmailParam] = useState({
        email: "",
        message: "",
        subject: "",
        html: ""
    });
    const [keyLink, setKeyLink] = useState (KeyRandome(26));

    const handleSubmit = async() => {    
        // проверка есть ли юзера в базе           
        await fetch(`${path}login/register?email=${email}`, {
            method: "GET",
        }).then((response) => {
            return response.json();                                                           
        }).then((data) => {
            if (data.length>0) {
                console.log (data[0].email)
                setError((prev) => ({ ...prev, userExist: true}));
                setError((prev) => ({ ...prev, wrongQuery: true}));  
                setError((prev) => ({ ...prev, emailFormat: true }));

                //добавляем key в таблицу users
                const addKey = async() => {   
                    try {
                        const res = await fetch(`/api/account/check_key?email=${data[0].email}`,  
                        {
                        method: "POST",
                        body: JSON.stringify({key: keyLink})
                        });  
                        setStatusReset(res.status);
                    }  
                    catch (err) {
                        console.log(err);
                    }}
                addKey();

                // отправляем письмо с key на почту
                const sendKey = async() => {
                    try {
                    const res = await fetch(`/api/account/reset_password?email=${data[0].email}`, 
                    {
                        method: "POST",
                        body: JSON.stringify(emailParam)
                    });  
                    console.log (res)
                    if (res.ok) {
                        setEmailSent(true);
                        setErrEmailSent(true);
                    };
                    }  
                    catch (err) {
                            console.log(err);
                            setEmailSent(false);
                            setErrEmailSent(false);
                    }
                }
                sendKey();
            }
            else {
                setError((prev) => ({ ...prev, userExist: false}));
            }
        }).catch((err) => {                                                
                setError((prev) => ({ ...prev, wrongQuery: false}));                
        });    
      };

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError((prev) => ({ ...prev, userExist: true}));
        setError((prev) => ({ ...prev, wrongQuery: true}));  
    };

    useEffect(() => 
    {       
      const reg =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      const user = email;
      if (reg.test(user) === false) {
          setError((prev) => ({ ...prev, emailFormat: false }));
      }
      else setError((prev) => ({ ...prev, emailFormat: true }));
      if (email === "") 
      {
          setError((prev) => ({ ...prev, emptyEmail: false }));
      }
      else setError((prev) => ({ ...prev, emptyEmail: true }));

      setEmailParam ({
        email: email,
        message: "",
        subject: "Смена пароля на сайте 'ВсеРецепты'",
        html: `<h3>Здравствуйте, ${email}!</h3><p>Для смены пароля на "ВсеРецепты" пройдите по <a href="http://localhost:3000/reset_password?email=${email}&key=${keyLink}">ссылке.</p>`,
    }); 

    }, [email])


  return (
    <> 
    <Meta robots="noindex"/> 
    {!session.data &&      
        <div className="loginHeight">
            <div className='wrapLogin'>
                <div className='loginForm'>
                    <div className='loginHeader'>
                        <img src="../logo-circle.png" loading="lazy" alt="vseresepty.ru cooking recipes forgot password" />
                        <h3>Вceрецепты</h3>
                    </div>
                    {!emailSent &&
                        <div>
                            <p>Введите в поле email который был указан при регистрации на сайте, вам будут высланы инструкции для смены пароля.</p>        
                            <form>
                                <div className='pdT10'>
                                    <div className='inputResetEmail'>                                    
                                        <input required type="text" placeholder="ваш email" name="code" onChange={handleChange} /> 
                                    </div>
                                </div>   
                            </form>  
                            <div className='loginError pd-b-15'>    
                                {!error.emailFormat && <div>Не верный формат.</div>}                            
                                {!error.wrongQuery && <div>Ошибка запроса.</div>} 
                                {!error.userExist && <div>Юзер с таким email не зарегистрирован.</div>} 
                                {!errEmailSent && <div>Ошибка отправки письма.</div>} 
                            </div> 
                            
                            {error.emailFormat &&
                            <div className='loginButton'>
                                <button type="submit" onClick={handleSubmit}>Отправить</button> 
                            </div>}
                        </div> }
                        {emailSent && <p>Письмо с инструкцией для восстановления пароля, отправлено на {email}.</p>}
                </div>
            </div>
        </div>}
    </>
  );
}
export default CheckCode;