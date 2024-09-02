
'use client'

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context';
import { useSession } from 'next-auth/react';
import '../../users_style.css'
import KeyRandome from '@/app/services/key_random_service/page';
import { Modal } from '@/app/components/modal/Modal';
import Meta from '@/app/components/meta/page';


const Account = () => {
    const [modal, setModal] = useState(false);
    const [modalExit, setModalExit] = useState(false);
    const {currentUser, auth, logout } = useContext (AuthContext);
    const [currentPage, setCurrentPage] = useState ("btn1");
    const [userInfo, setUserInfo] =  useState({username: "", email: "", first_name: "", last_name: "", birth_day: "", id: "", public_name: "", public_img: "", site: "", instagram: "", facebook: "", twitter: ""});    
    const [birthDay, setBirthDay] =  useState ("");
    const [avatar, setAvatar] = useState ("");    
    const [file, setFile] = useState(null);
    const [disabled, setDisabled]=useState(false);    
    const [savedRecipes, setSavedRecipes] = useState ({"saved": []});  
    const [isDirty, setIsDirty] = useState(false);    
    const [arrSaved, setArrSaved] = useState ({"saved": []});   
    const [mailLink, setMailLink] = useState(""); 
    const [keyLink, setKeyLink] = useState (KeyRandome(26));
    const router = useRouter();
    const session = useSession();
    const [user, setUser] = useState(null);
    const [typeUser, setTypeUser] = useState(null);
    const [inputValueFirst, setInputValueFirst] = useState(false);
    const [inputValueLast, setInputValueLast] = useState(false);
    let [fixedSaveRecipes, setFixedSaveRecipes] = useState ({"saved": []}); 
    const [errorName, setErrorName] = useState (); 
    const [errorLastName, setErrorLastName] = useState (); 
    

    useEffect (( ) => {
        if (currentUser) {setUser (currentUser); setTypeUser("users")}
        else {
            if (session) {setUser (session?.data?.user.email); setTypeUser("users_social")}  
        }
    }, [currentUser, session]);

    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        birth_day: "",
        typeUser: typeUser,
        email: user
    });

    const [inputsPublic, setInputsPublic] = useState({
        public_name: "",
        public_img: "",
        site: "",
        instagram: "",
        facebook: "",
        twitter: "",
        typeUser: typeUser,
        email: user,
        key: ""
    });

    const [email, setEmail] = useState({
        email: user,
        message: "",
        subject: "",
        html: ""
    });


    const [input, setInput] = useState([{"search_text": ""}]);
    const [statusReset, setStatusReset] = useState("");


    const handleClickSearch = (() => {   
        if (input.search_text!=="") {
            router.push(`/recipes/search?state=${input.search_text}`);
        }
    }) 

    const handleChangeSearch = (e) => {
        let trimStr = e.target.value.trim();   // удаление пробелов в начале и в конце
        let trimStr1 = trimStr.replace(/\s+/g, ' ').trim();  // удаление всех лишних пробелов
        setInput((prev) => ({ ...prev, [e.target.name]: trimStr1 }));
    };

    useEffect(() => {
        if (user && user !==null && typeUser!==null) {
           async function getUserInfo() {
                const res = await fetch(`/api/account/user?email=${user}&type=${typeUser}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setUserInfo(data[0]);
                    setInputs({
                        first_name: data[0]?.first_name,
                        last_name: data[0]?.last_name,
                        birth_day: data[0]?.birth_day,
                        email: user,
                    });
                    setInputsPublic({
                        public_name: data[0]?.public_name,
                        public_img: data[0]?.public_img,
                        site: data[0]?.site,
                        instagram: data[0]?.instagram,
                        facebook: data[0]?.facebook,
                        twitter:data[0]?.twitter,
                        email: user,
                        key: data[0]?.key_link,
                    });

                }).catch((err) => {
                    console.log(err);
                });
              }
              getUserInfo();             

            async function getSavedRecipe() {
                const res = await fetch(`/api/users/save_recipes/user?email=${user}&type=${typeUser}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {                            
                    setSavedRecipes(JSON.parse(data[0].saved_recipes));
                }).catch((err) => {
                    console.log(err);
                });
            }
            getSavedRecipe();  
        }                 
        setEmail ({
            email: user,
            message: "",
            subject: "Смена пароля на сайте 'ВсеРецепты'",
            html: `<h3>Здравствуйте, ${user}!</h3><p>Для смены пароля на "ВсеРецепты" пройдите по <a href="http://localhost:3000/reset_password?email=${user}&key=${keyLink}">ссылке.</p>`,
        });       
  }, [user]);

  useEffect(() => 
    {       
            const fetch = async () => {
                try                  
                    {
                        await fetch (`/auth/add_code`, {
                            method: "POST",
                            body: {key_link: keyLink, email: user}
                        })
                    }
                catch(err) {console.log (err)}
                }
            fetch();
    }, [userInfo, mailLink])


  useEffect(() => {  
        setMailLink (auth);
  }, [auth, currentUser?.id])


  useEffect(() => {  
    if (inputs.first_name.length>0) {            
        let trimStr = inputs.first_name.trim();   // удаление пробелов в начале и в конце
        let trimStr1 = trimStr.replace(/\s+/g, ' ').trim();  // удаление всех лишних пробелов 
        inputs.first_name=trimStr1;  
        if (inputs.first_name==="")   {
            setInputValueFirst(false);
            setErrorName (false);
        }
        else {
            setInputValueFirst(true);
            setErrorName (true);
        }
     }
     if (inputs.last_name.length>0) {            
        let trimStr = inputs.last_name.trim();   // удаление пробелов в начале и в конце
        let trimStr1 = trimStr.replace(/\s+/g, ' ').trim();  // удаление всех лишних пробелов 
        inputs.last_name=trimStr1;  
        if (inputs.last_name==="")   {
            setInputValueLast(false);
            setErrorLastName (false)
        }
        else {
            setInputValueLast(true);
            setErrorLastName (true)
        }
     }
}, [inputs])

  useEffect(() => {
        setArrSaved(savedRecipes);
        arrSaved?.saved?.forEach(function(item, index, array) {
             item.like = "false";
        });                   
  }, [savedRecipes, arrSaved]);

  useEffect(() => {
         let b = new Date(userInfo?.birth_day);
         let bm, bd;
         bm = b.getMonth();
         bm++;
         if (bm===13) {bm=12};
         if (bm<10) {
             bm = `0${bm}`
         }
         if (b.getDate()<10) {
             bd = `0${b.getDate()}`
         }
         else bd = b.getDate();
         setBirthDay (`${b.getFullYear()}-${bm}-${bd}`);      
         inputs.birth_day = `${b.getFullYear()}-${bm}-${bd}`;
 }, [userInfo, inputs]);

  const addImg = async (e) => {
    e.preventDefault();
    //if (!mainImg) return;
    try {
        const data = new FormData();
        data.set('file', file);
        const res = await fetch ("/api/upload", {
            method: "POST",
            body: data
        })
        if (res.ok) {
            setAvatar(file.name); 
            inputsPublic.public_img = `${file.name}`;
        }
        if (!res.ok) throw new Error(await res.text())
        }
    catch {(e)=> console.log (e)}
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangePublic = (e) => {
    setInputsPublic((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleChangeDate = (e) => {
      setBirthDay(e.target.value);
      inputs.birth_day = e.target.value;
  };

  const handleClick = async () => {      
    try {
        const res = await fetch(`/api/account/user?email=${user}&type=${typeUser}`, 
        {    
            method: "POST",
            body: JSON.stringify(inputs)
        });  
        if (res.ok) {
            setModal (true);
        }
    }  
    catch (err) {
        console.log(err);
    }
    // window.location.reload();
  };

  const handleModalExit = () => {    
    setModalExit(true);
  };

  const handleModal = () => {    
    window.location.reload();
  };

  const handleClickPublic = async () => {  
    try {
         await fetch(`/api/account/user?email=${user}&type=${typeUser}`, 
         {    
             method: "PUT",
             body: JSON.stringify(inputsPublic), 
         });   
     }  
     catch (err) {
         console.log(err);
     }
    // window.location.reload();
  };

  const resetPassword = async () =>
    {

        //добавляем key в таблицу users
        try {
              const res = await fetch(`/api/account/check_key?email=${user}`,  
              {
                 method: "POST",
                 body: JSON.stringify({key: keyLink})
              });  
              setStatusReset(res.status);
        }  
         catch (err) {
               console.log(err);
        }

        // отправляем письмо с key на почту
        try {
            const res = await fetch(`/api/account/reset_password?email=${user}`, 
            {
               method: "POST",
               body: JSON.stringify(email)
            });  
            //setStatusReset(res.status);
        }  
        catch (err) {
                console.log(err);
        }
    }
   
  const hanldeSave = (e => {  
      const likeBtn = e.target.closest(".selector")
        setIsDirty (true);
        const aria = {
            label: {
                true: "Удалить",
                false: "Сохранить"
            }
        }
        likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
        likeBtn.ariaLabel = aria.label[likeBtn.ariaPressed]; 
        arrSaved.saved[likeBtn.dataset.id].like=`${likeBtn.ariaPressed}`;
        fixedSaveRecipes.saved = arrSaved.saved.filter(item => item.like === 'false'); 

        try {
            
            fetch(`/api/users/save_recipes?email=${user}&type=${typeUser}`, 
            {    
                method: "PUT",
                body: JSON.stringify(fixedSaveRecipes), 
            });   
        }  
        catch (err) {
            console.log(err);
        }

    }      
  )
  

  return (          
            <div className='accountWrap'>
                <Meta robots="noindex"/>                 
                <div className='navTop'>
                    <div className='navTopContent'>
                        <div className='logoLink'>
                            <img src="/img/logo.png" alt="logo Vseresepty.ru" loading="lazy"/>    
                            <a href="/recipes">всерецепты</a>
                        </div>
                        <div className='searchTopNav'>
                            <div className='searchTopNavInput'> 
                                <div className='searchTopNav'>    
                                    <input type="search" placeholder="Поиск" name="search_text" onChange={handleChangeSearch}/>
                                    <div className='searchNavIcon' onClick = {handleClickSearch}>
                                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="rgba(0, 0, 0, 0.65)"/>
                                        </svg>
                                    </div>
                                </div>  
                            </div> 
                        </div>                        
                        {user &&                   
                        <div className='addRecipe'>
                            <span>
                                <a href="/users/add_recipe">ДОБАВИТЬ РЕЦЕПТ</a>
                            </span>
                        </div>}
                    </div>
                </div> 
                {!user && <div className='accountContent'><p>Для личного кабинета требуется <a href='/login'>регистрация</a></p></div>}
                {user && 
                <div className='accountContent'>
                    <div className='wrapAccountContent'>
                        <div className='navAccountWrap'>
                            <div className='navAccount'>
                                <div className='accNavHeader'>
                                    <div>
                                        <img src="/img/icon_acc_user.png" alt="user Vseresepty.ru" loading="lazy"/>
                                    </div>
                                    <div className='headMenu'>
                                        Привет, {user}!
                                    </div>                                
                                </div>
                                <div className='navAccountItem'>
                                    <button type="button" onClick={()=>setCurrentPage("btn1")} name="btn1">Личная информация</button>
                                </div>
                                <div className='navAccountItem'>
                                    <button type="button" onClick={()=>setCurrentPage("btn2")} name="btn2">Настройка профиля</button>
                                </div>
                                {typeUser==="users" &&
                                <div className='navAccountItem'>
                                    <button type="button" onClick={()=>setCurrentPage("btn3")} name="btn3">Сменить пароль</button>
                                </div>}
                                {typeUser==="users" &&
                                <div className='navAccountItem'>
                                    <button type="button" onClick={handleModalExit}>Выйти из ЛК</button>
                                </div>}  
                                {typeUser==="users_social" &&
                                <div className='navAccountItem'>
                                    <button type="button"><a href="/api/auth/signout?callbackUrl=/">Выйти из ЛК</a></button>
                                </div>}  
                             </div>
                                <div className='navRecipeItem'>
                                    <button type="button" onClick={()=>setCurrentPage("btn4")} name="btn4">Сохраненные рецепты</button>
                                </div>  
                                <Modal
                                        isVisible={modalExit}
                                        title="Выход из ЛК"
                                        content = <>Подтвердите действие</>
                                        footer={<button className='buttonWhiteSm' onClick={logout}>ОК</button>}
                                        onClose={() => setModalExit(false)}    
                                    />    

                                                     
                        </div>
                        <div className='mainContent'>
                            {currentPage==="btn1" && 
                                <>
                                    <Modal
                                        isVisible={modal}
                                        title="Личная информация"
                                        content = <>Информация успешно обновлена</>
                                        footer={<button className='buttonWhiteSm' onClick={handleModal}>ОК</button>}
                                        onClose={() => setModal(false)}    
                                    />  
                                    <div className='accountTopInfo'>
                                        <div className='profileTwoCol'>
                                            <h1>Личная информация </h1>

                                            {inputValueFirst&&inputValueLast &&
                                                <div className='saveButton'>
                                                    <button disabled={disabled} type="submit" onClick={handleClick}>СОХРАНИТЬ</button>  
                                                </div>
                                            }                                            
                                        </div>
                                        <p>Только вы можете видеть информацию на этой странице. Она не будет отображаться для просмотра другими пользователями.</p>
                                    </div>
                                    <div className='accountBaseInfo'>
                                        <h2>Основные данные</h2>
                                        <label htmlFor="email">Ваш email</label>
                                        <input type="email" disabled value={user} name="email" />
                                        <div className='baseInfoTwoCol'>
                                            <div>
                                                <label htmlFor="first_name">Имя<span className='stars'>★</span></label>
                                                <input type="text" placeholder={inputs.first_name} id="first_name" name="first_name" onChange={handleChange} />   
                                                {!errorName && <div className='error mr-t-10'>Заполните поле</div>}
                                            </div>
                                            <div>
                                                <label htmlFor="last_name">Фамилия<span className='stars'>★</span></label>
                                                <input type="text" placeholder={inputs.last_name} id="last_name" name="last_name" onChange={handleChange} />   
                                                {!errorLastName && <div className='error mr-t-10'>Заполните поле</div>}
                                            </div>
                                        </div>  
                                        <div className='mainInfo'>                                   
                                            <div className='baseInfoDate'> 
                                                {/* { userInfo.birth_day && <>  */}
                                                    <div><label>Дата рождения</label></div>  
                                                        <div className='birthDate'>                                                       
                                                                <input type="date" value={birthDay} name="birth_date" onChange={handleChangeDate} />                                                                  
                                                        </div>      
                                                    {/* </> */}                                                
                                            </div>
                                        </div>  
                                    </div>                                                                                                   
                                </>
                            }
                        {currentPage==="btn2" &&
                            <>
                                <>
                                    <div className='accountTopInfo'>
                                        <div className='profileTwoCol'>
                                            <h1>Публичный профиль</h1>
                                            <div className='saveButton'>
                                                <button type="submit" onClick={handleClickPublic}>СОХРАНИТЬ</button>  
                                            </div>
                                        </div>
                                        <p>Информация с этой страницы будет отображаться в вашем публичном профиле, который виден остальным пользователям.</p>
                                    </div>
                                    <div className='accountBaseInfo'>
                                            <h2>Обо мне</h2> 
                                            <div className='publicTwoCol'>                                        
                                                <div className="flex-item">                                            
                                                    <label htmlFor="public_name">Отображаемое имя</label>
                                                    <input type="text" placeholder={inputsPublic.public_name} name="public_name" onChange={handleChangePublic} />                                                 
                                                </div>                                                      
                                            </div>                                    
                                        <div className='profileTwoColImg'>
                                            <div className='profileImg'>                                   
                                                <h3>Загрузить аватар</h3> 
                                                <label htmlFor="file">
                                                        <div>
                                                            {(!avatar && (inputsPublic.public_img===null)) && 
                                                                <div className='avatarImgDefault'>
                                                                    <img src="/img/icon_avatar.png" loading="lazy" alt="фото профиля Vseresepty.ru"/>
                                                                    <p>Фото профиля</p>
                                                                </div>}
                                                            {(avatar && (inputsPublic.public_img===null)) && <div className='avatarImg'><img src={`/upload/${avatar}`} loading="lazy" alt="фото профиля Vseresepty.ru"/></div>}
                                                            {(inputsPublic.public_img!==null) && <div className='avatarImg'><img src={`/upload/${inputsPublic.public_img}`} loading="lazy" alt="фото профиля Vseresepty.ru"/></div>}
                                                            <input style={{ display: "none" }} type="file" id="file" name="" onChange={(e) => setFile(e.target.files[0])} />
                                                        </div>
                                                        <div className='buttonWhite' onClick={addImg}><span>ЗАГРУЗИТЬ</span></div>                                    
                                                </label>
                                            </div>
                                            <div className='socialProfile'>
                                                <label htmlFor="site">Сайт</label>
                                                <input type="text" placeholder={inputsPublic.site} name="site" onChange={handleChangePublic}/>

                                                <label htmlFor="instagram">Instagram</label>
                                                <input type="text" placeholder={inputsPublic.instagram} name="instagram" onChange={handleChangePublic}/>

                                                <label htmlFor="twitter">Twitter</label>
                                                <input type="text" placeholder={inputsPublic.twitter} name="twitter" onChange={handleChangePublic}/>

                                                <label htmlFor="facebook">Facebook</label>
                                                <input type="text" placeholder={inputsPublic.facebook} name="facebook" onChange={handleChangePublic}/>
                                            </div>
                                        </div>
                                    </div>                                                                                                   
                                </>
                            </>
                            }
                            {currentPage==="btn3" &&
                            <>
                                <>
                                    <div className='accountResetPassword'>
                                        <h1>Сменить пароль</h1>
                                        {statusReset!==200 &&
                                            <p>Если вы хотите изменить свой пароль, нажмите кнопку ниже, и мы отправим инструкции по смене пароля на адрес вашей электронной почты.</p>
                                        }
                                    </div>
                                    {(statusReset===400 || statusReset===401 || statusReset===403 || statusReset===404 || statusReset===500) &&                                 
                                        <div  className="pd-l-10">
                                            <div className='error'>Что то пошло не так, попробуйте снова</div>
                                        </div>
                                    }
                                    {statusReset===200 && 
                                        <p>На вашу почту отправлено письмо с инструкцией для смены пароля.</p>
                                    }
                                    {statusReset!==200 &&
                                        <div className='resetPasswButton'>
                                            <button onClick={resetPassword} type="submit">СМЕНИТЬ ПАРОЛЬ</button>
                                        </div>     
                                    }
                                    </>
                                </>
                            }
                            {currentPage==="btn4" &&
                            <>
                            
                                <>
                                    <div className='accountTopInfo'>
                                        <h1>Сохраненные рецепты</h1> 
                                    </div>  
                                    <div className='accountBaseInfo'>
                                        <div className='accountSaved'>                                        
                                            {savedRecipes?.saved?.map((item, index) => {
                                                return (   
                                                    <div key={`review${index}`}>                                                                                                    
                                                    <a href={`http://localhost:3000${item.recipe}`}>{item.name}</a>  
                                                        <div className='saveControl'>                                                        
                                                            <span onClick={hanldeSave}>
                                                                <button className="selector" aria-label="Сохранить" aria-pressed="false" data-id={index}>
                                                                    <svg width="30" height="30" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.8398 2.39496C13.013 -0.169205 10.2871 2.03882 9.27755 
                                                                            3.46336C8.26797 2.03882 5.54163 -0.169205 2.71481 2.39496C-0.112011 
                                                                            4.95912 1.87349 8.80536 3.2196 10.408C4.22918 11.6544 6.85456 14.361  
                                                                            9.27755 15.2158C11.7005 14.361 14.3254 11.6544 15.335 10.408C16.6811 
                                                                            8.80536 18.6666 4.95912 15.8398 2.39496Z" stroke="black" 
                                                                            strokeWidth="1" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </button>
                                                            </span> 
                                                            <img src={`/upload/${item.img}`} loading="lazy" alt={item.name}/>                                                                                           
                                                        </div>                                                 
                                                    </div>
                                                    )
                                                  }
                                                )} 
                                            </div>
                                        </div>                                                                                                                      
                                    </>
                                </>
                            }
                        </div>
                    </div>
                </div> } 
            </div>  
   );
};
export default Account;

