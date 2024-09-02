"use client";
import React, { useContext } from 'react';
import { useSession } from "next-auth/react"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './../styles-auth.css';
import KeyRandome from '@/app/services/key_random_service/page';
import { AuthContext } from '@/context';
import Meta from '@/app/components/meta/page';
 
const Login = () => {    
    const currentUrl = usePathname();

    // useEffect(() => 
    // {     
    //     //document.querySelector('title').append('text');
    //    document.querySelector('title').innerHTML="";       
    // }, [currentUrl])
    
    const { login, status} = useContext(AuthContext);
    const path = process.env.PATH_API; 
    const url = process.env.URL;
    const router = useRouter();
    const [value, setValue] = useState('1');
    const [statusReset, setStatusReset] = useState(0);
    const [createCode, setCreateCode] = useState(false);
    const [err, setError] = useState(null);
    const [errorTempReg, setErrorTempReg] = useState("");
    const location = usePathname();
    const [keyLink, setKeyLink] = useState (KeyRandome(6));
    const [statusSent, setStatusSent] = useState(false);  
    const [errorReg, setErrorReg] = useState({
        emailFormat : true,
        emptyEmail : false,
        emptyPassword : false,
        userExist : true,
        userPassword : true
    });  
    const [errorMessageReg, setErrorMessageReg] = useState({
      emailFormat : true,
      emptyEmail : false,
      emptyPassword : false,
      userAlreadyExist : false,
      statusSending : true
  });
  
    const [email, setEmail] = useState({
      email: "",
      message: "",
      subject: "",
      html: "",
      code: ""
    });
  
    const [inputs, setInputs] = useState({
      username: "",
      password: "",
    });
  
    const [inputsTempReg, setInputsTempReg] = useState({
      username: "",
      email: "",
      code: keyLink,
    });

    const session = useSession();
  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    useEffect(() => 
    {       
          setErrorReg((prev) => ({ ...prev, emailFormat: true }));
          setErrorReg((prev) => ({ ...prev, emptyEmail: false }));
          setErrorReg((prev) => ({ ...prev,  emptyPassword: false }));  
          setErrorMessageReg((prev) => ({ ...prev, emailFormat: true }));
          setErrorMessageReg((prev) => ({ ...prev, emptyEmail: false }));
          setErrorMessageReg((prev) => ({ ...prev,  emptyPassword: false }));
    }, [location])
  
    useEffect(() => 
    {       
      const reg =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      const email = inputs.username;
      if (reg.test(email) === false) {
          setErrorReg((prev) => ({ ...prev, emailFormat: false }));
      }
      else setErrorReg((prev) => ({ ...prev, emailFormat: true }));
      if (inputs.username === "") 
      {
          setErrorReg((prev) => ({ ...prev, emptyEmail: true }));
      }
      else setErrorReg((prev) => ({ ...prev, emptyEmail: false }));
      if (inputs.password === "") 
      {
          setErrorReg((prev) => ({ ...prev, emptyPassword: true }));
      }
      else setErrorReg((prev) => ({ ...prev, emptyPassword: false }));
    }, [inputs])
  
    const handleChangeTempReg = (e) => {
      setInputsTempReg((prev) => ({ ...prev, username: e.target.value }));
      setInputsTempReg((prev) => ({ ...prev, email: e.target.value }));
    };
  
    useEffect(() => 
    {       
        setStatusSent(false);
        setErrorMessageReg((prev) => ({ ...prev, userAlreadyExist: false }));
        setErrorMessageReg((prev) => ({ ...prev,  statusSending: true }));
      const reg =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      const email = inputsTempReg.email;
      if (reg.test(email) === false) {
          setErrorMessageReg((prev) => ({ ...prev, emailFormat: false }));
      }
      else setErrorMessageReg((prev) => ({ ...prev, emailFormat: true }));
      if (inputsTempReg.email === "") 
      {
          setErrorMessageReg((prev) => ({ ...prev, emptyEmail: false }));
      }
      else setErrorMessageReg((prev) => ({ ...prev, emptyEmail: true }));
    }, [inputsTempReg])
  

    const handleSubmit = async (e) => {
       e.preventDefault();
       setErrorReg((prev) => ({ ...prev, userExist: true }));
       setErrorReg((prev) => ({ ...prev, userPassword: true }));
       if (inputs.username === "") 
       {
           setErrorReg((prev) => ({ ...prev, emptyEmail: true }));
       }
       else setErrorReg((prev) => ({ ...prev, emptyEmail: false }));
       if (inputs.password === "") 
       {
           setErrorReg((prev) => ({ ...prev, emptyPassword: true }));
       }
       else setErrorReg((prev) => ({ ...prev, emptyPassword: false }));
  
       if (errorReg.emailFormat && !errorReg.emptyEmail && !errorReg.emptyPassword)
        {
            try {
                await login(inputs);
            } catch (err) {
                console.log("err");  
            }                  
        }
     };

    //если есть активная сессия под паролем от соцсетей то перенаправление на signout чтобы разлогиниться
     useEffect(() => 
     { 
         if (session.data)
         {
             router.push("/api/auth/signout?callbackUrl=/");
         }
     },[session.data])

     useEffect(() => 
     { 
        if (status===200)
        {
            router.push("/recipes");
        }
        if (status===401)
        {
            setErrorReg((prev) => ({ ...prev, userExist: false }));
        }
        else setErrorReg((prev) => ({ ...prev, userExist: true }));
        if (status===403)
        {
            setErrorReg((prev) => ({ ...prev, userPassword: false }));
        }
        else setErrorReg((prev) => ({ ...prev, userPassword: true }));
     },[status])

  
    useEffect(() => 
    {       
            setEmail ({
                email: inputsTempReg.email,
                message: "",
                subject: "Регистрация на сайте 'ВсеРецепты'",
                html: `<h3>Здравствуйте, ${inputsTempReg.username}!</h3><p>Для регистрации на сайте "ВсеРецепты" пройдите по <a href="${url}/check_code/${inputsTempReg.email}">ссылке. </a>Ваш код ${keyLink}</p>`,
                code: keyLink
            });
    }, [inputsTempReg])
  
    
    const handleChangeTab = (event, newValue) => {
      setValue(newValue);
    };
  
  
    useEffect (() =>
    {    
      if (statusReset===200) {
        
          const  fetch = async() =>
          {
              try {
                  await axios.post(path+`/api/login/register`, (email));              
          }  
          catch (err) {
              return err;
          } }
  
          fetch ();
      }
    }, [email])
  
    const handleSubmitTempReg = async (e) => {  // временная регистрация
          e.preventDefault();

          if (errorMessageReg.emailFormat  &&  errorMessageReg.emptyEmail)
              { 
                // проверка есть ли такой email среди постоянных зареганных юзеров
                const res = await fetch(`${path}login/register?email=${email.email}`, {  
                    method: "GET",  
                }).then((response) => {
                        return response.json();                                                           
                }).then((data) => {
                    if (!data[0])
                    {
                        setErrorMessageReg((prev) => ({ ...prev,  userAlreadyExist: false }));
                        setStatusSent(true);
                        fetch(`${path}login/register`, {   // отправка письма для временной регистрации
                            method: "POST",
                            body: JSON.stringify(email),
                            }).then((data) => {
                                if (data.status===200) {
                                    setErrorMessageReg((prev) => ({ ...prev,  statusSending: true }));
                                    // добавляем юзера во временно зареганных
                                    fetch(`${path}login/temp_register`, {
                                        method: "PUT",
                                        body: JSON.stringify(inputsTempReg),
                                    // }).then((data) => {
                                    //     console.log (data);
                                    }).catch((err) => {                                
                                            console.log(err);
                                    });        
                                }
                            })
                            .catch((err) => {                                
                                console.log(err);
                        });                   
                    }
                    else setErrorMessageReg((prev) => ({ ...prev,  userAlreadyExist: true }));
                }).catch((err) => {
                    console.log(err);
                });
              }
    };

  return (
    <>
    <Meta robots="noindex"/> 
    {!session.data &&
        <div className="loginHeight">
        <div className="wrapLogin">
            <div className="loginForm">
                <div className="loginHeader">
                    <img src="./img/logo-circle.png" loading="lazy" alt="vseresepty.ru cooking recipes login" />
                    <h3>Вceрецепты</h3>
                </div>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="">
                            <Tab label="Вход" value="1" />
                            <Tab label="Регистрация" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">                
                        <form>
                            <div className="inputUser">
                                <input required type="text" placeholder="email" name="username" onChange={handleChange} /> 
                            </div> 
                            {!errorReg.emailFormat && <div className="loginError">Не верный формат</div>}
                            {errorReg.emptyEmail && <div className="loginError">Поле не должно быть пустым</div>}  
                            <div className='pdT10'></div>
                            <div className="inputPassw">
                                <input required type="password" placeholder="пароль" name="password" onChange={handleChange} />
                            </div>
                            {errorReg.emptyPassword && <div className="loginError">Поле не должно быть пустым</div>}
                            {err && <div className="loginError">{err}</div>}                           
                            {!session.data &&<div className="forgetPassw"><Link href="/forgot_password">Забыли пароль?</Link></div>}
                            <div className="forgetPassw"><Link href="/api/auth/signin">Вход через Google</Link></div>
                        </form>   
                        {!errorReg.userExist && <div className="loginError">Юзер не найден.</div>}    
                        {!errorReg.userPassword && <div className="loginError">Не верный пароль.</div>}                
                        <div className="loginButton">
                            <button onClick={handleSubmit}>Вход </button>
                            
                        </div>
                    </TabPanel>
                    <TabPanel value="2">     
                        {(!createCode || errorTempReg!=="") && 
                            <form>                  
                                <div className="pdT20"></div>  
                                <div className="inputMail">
                                    <input required type="email" placeholder="email" name="email" onChange={handleChangeTempReg} />
                                </div>
                                <div className="pdT10"></div> 
                                <div className='pdB20'>
                                    {errorTempReg &&  <div className="loginError">{errorTempReg}</div>}
                                    {!errorMessageReg.emailFormat  &&  <div className="loginError">Не верный формат</div>}
                                    {!errorMessageReg.emptyEmail  &&  <div className="loginError">Поле не должно быть пустым</div>} 
                                    {errorMessageReg.userAlreadyExist  &&  <div className="loginError">Пользователь с таким email уже зарегистрирован</div>} 
                                    {!errorMessageReg.statusSending &&  <div className="loginError">Ошибка отправки. Проверьте правильность указанного email.</div>}
                                    {statusSent &&  <div className="loginError">Письмо с инструкцией отправлено на указанную почту.</div>}
                                </div>
                                {!errorTempReg&&errorMessageReg.emailFormat&&errorMessageReg.emptyEmail&&!statusSent &&
                                    <div className="loginButton">
                                        <button onClick={handleSubmitTempReg}>Выслать письмо с кодом </button>
                                    </div>                           
                                }
                            </form>}
                        
                    </TabPanel>
                </TabContext>
            </div>
        </div>
        </div>
        
        }

    </>
  )
}

export default Login