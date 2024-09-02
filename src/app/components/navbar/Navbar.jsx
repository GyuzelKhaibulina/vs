"use client";
import Link from 'next/link';
import Image from 'next/image';
import './styles-navbar.css';
import { useEffect, useState, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { AuthContext } from '@/context';
import Button from '../button/Button';


export const metadata = {
    title: 'Vseresepty Navigation',
    description: 'Cooking Recipes Vseresepty Navigation',
}

const Navbar = () => {
    const { auth, currentUser, logout } = useContext(AuthContext);
    const session = useSession();
    const [search, setSearch]= useState (false);
    const [input, setInput] = useState([{"search_text": ""}]);
    const router = useRouter();
    const currentUrl = usePathname();


    const handleOpen = () => {
        setSearch (true)
    }
    const handleClose = () => {
        setSearch (false)  
    }
    
    const handleChange = (e) => {
        let trimStr = e.target.value.trim();   // удаление пробелов в начале и в конце
        let trimStr1 = trimStr.replace(/\s+/g, ' ').trim();  // удаление всех лишних пробелов
        setInput((prev) => ({ ...prev, [e.target.name]: trimStr1 })); 
    };
  
    const handleClick = (() => {  
        if (input.search_text!=="") {
             router.push(`/recipes/search?state=${input.search_text}` , { params: {search:input.search_text}});
        }
      }) 
    useEffect (() =>
       {  
           auth 
       }, [currentUrl])


  return (
    <div className='navContainer'>
        <div className="navHeader">
            <div className="navWrapper"> 
                <section className="navSection">  
                    <span className="navTitle">
                        <Image loading="lazy" alt="Logo Vseresepty.ru cooking recipes" src="/img/logo.png" width={71} height={76} />
                        <Link href="/recipes">всерецепты</Link>       
                    </span>                    

                    <div className="nav">
                        <div className="navLeft">
                        <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/kitchen/"><span>КУХНЯ</span></Link>
                                </div>
                                <span className="dropdownContent">                                       
                                    <Link href="/recipes/kitchen/rus">Русская</Link>
                                    <Link href="/recipes/kitchen/eur">Европейская</Link>
                                    <Link href="/recipes/kitchen/kavk">Кавказская</Link>
                                    <Link href="/recipes/kitchen/turk">Тюркская</Link>
                                    <Link href="/recipes/kitchen/asia">Азиатская</Link>                                                                     
                                </span>
                            </div>                          
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/main/"><span>ОСНОВНЫЕ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/main/bouillon">Бульоны</Link>
                                    <Link href="/recipes/main/cereals">Крупы и каши</Link>
                                    <Link href="/recipes/main/garnish">Гарниры</Link>
                                    <Link href="/recipes/main/sauces">Соусы</Link>
                                    <Link href="/recipes/main/base">Основы и заготовки</Link>
                                </span>
                            </div>   
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/soup/"><span>СУПЫ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/soup/meat">Мясные</Link>
                                    <Link href="/recipes/soup/fish">Рыба, морепродукты</Link>                                    
                                    <Link href="/recipes/soup/veg">Вегетарианские</Link>
                                    <Link href="/recipes/soup/pure">Супы-Пюре</Link>
                                    <Link href="/recipes/soup/cold">Холодные</Link>
                                    <Link href="/recipes/soup/bbq">На мангале</Link>
                                </span>
                            </div>  
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/second/"><span>ВТОРЫЕ БЛЮДА</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/second/meat">Мясо</Link>
                                    <Link href="/recipes/second/bird">Птица</Link>
                                    <Link href="/recipes/second/fish">Рыба и морепродукты</Link>
                                    <Link href="/recipes/second/veg">Вегетарианские</Link>
                                    <Link href="/recipes/second/bbq">На мангале</Link>
                                </span>
                            </div> 
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/salad/"><span>САЛАТЫ</span></Link>
                            </div>
                            <span className="dropdownContent">                                  
                                    <Link href="/recipes/salad/meat">Мясные</Link>
                                    <Link href="/recipes/salad/fish">Рыбные, с морепродуктами</Link>
                                    <Link href="/recipes/salad/warm">Теплые</Link>
                                    <Link href="/recipes/salad/fruit">Фруктовые</Link>
                                    <Link href="/recipes/salad/veg">Вегетарианские</Link>
                                </span>
                            </div> 
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/pelmeni/"><span>ПЕЛЬМЕНИ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/pelmeni/meat">С мясом</Link>
                                    <Link href="/recipes/pelmeni/fish">Рыба, морепродукты</Link>
                                    <Link href="/recipes/pelmeni/veg">Вегетарианские</Link>
                                </span>
                            </div>
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/snacks/"><span>ЗАКУСКИ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/snacks/roll">Рулеты, роллы, рулетики</Link>
                                    <Link href="/recipes/snacks/salad">Салатные</Link>
                                    <Link href="/recipes/snacks/pickles">Маринады, соленья</Link>
                                    <Link href="/recipes/snacks/veg">Вегетарианские</Link>
                                </span>
                            </div>
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/dough/"><span>ТЕСТО, ДЕСЕРТ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/dough/dough">Блюда из теста</Link>
                                    <Link href="/recipes/dough/sweet">Сладкие блюда из теста</Link>
                                    <Link href="/recipes/dough/dessert">Десертные блюда</Link>
                                </span>
                            </div>
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/drink/"><span>НАПИТКИ</span></Link>
                            </div>
                            <span className="dropdownContent">
                                    <Link href="/recipes/drink/cold">Прохладительные</Link> 
                                    <Link href="/recipes/drink/smooth">Смузи</Link>    
                                    <Link href="/recipes/drink/coctails">Коктейли</Link>  
                                    <Link href="/recipes/drink/compote">Морсы, компоты</Link>                                  
                                    <Link href="/recipes/drink/tea">Чаи</Link>
                                    <Link href="/recipes/drink/coffee">Кофе</Link>                                                                                                       
                                </span>
                            </div>
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/multi/"><span>МУЛЬТИВАРКА</span></Link>
                            </div>
                            <span className="dropdownContent">                               
                                    <Link href="/recipes/multi/soup">Супы</Link> 
                                    <Link href="/recipes/multi/second">Вторые блюда</Link>    
                                    <Link href="/recipes/multi/dough">Тесто, десерт</Link>  
                                    <Link href="/recipes/multi/main">Заготовки, основы</Link>                                                                                                                                      
                                </span>
                            </div>
                        </div> 
                        <div>                       
                            <div className="navRight">                            
                                <div>                           
                                    <div className="searchTopNav">
                                        {!search &&
                                            <div className="searchNav">  
                                                <svg onClick = {handleOpen} width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="rgba(0, 0, 0, 0.65)"/>
                                                </svg>                        
                                            </div>            
                                        }
                                        {search &&
                                            <div className="searchTopNavClose">  
                                                <div className="searchTopNavInput">                                          
                                                    <input type="search" placeholder="Поиск" name="search_text" onChange={handleChange}/>
                                                    <div className="searchTopNavIcon" onClick = {handleClick}>
                                                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="rgba(0, 0, 0, 0.65)"/>
                                                        </svg>
                                                    </div>
                                                </div> 
                                                {<svg onClick={handleClose} width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"  fill="#0F0F0F"/>
                                                </svg>}
                                            </div>  
                                        }
                                    </div>
                                </div>   
                        {session.data &&
                            <>
                               <div className='dropdown'>
                                            <div className='dropbtn'>
                                                <span className='dropbtnpos'>
                                                    <img src='/img/icon-acc.png'  loading="lazy" alt="logo vseresepty.ru cooking recipes "/><span>{session.data.user.email}</span>
                                                </span>
                                            </div>
                                            <span className='dropdownContentRight'>                                                
                                            <Link href={`/users/account/${session.data.user.email}`}>Личный кабинет</Link>
                                            <Link href="/users/add_recipe">Добавить рецепт</Link>
                                            <Link href="/api/auth/signout?callbackUrl=/">Выйти</Link>
                                            </span>
                                        </div>  
                            </>
                        }
                        {!session.data&&!currentUser &&
                            <div className='loginNavRight'><Link href="/login">Войти</Link></div>
                        }                         
                        {!session.data&&currentUser && 
                                        <div className='dropdown'>
                                            <div className='dropbtn'>
                                                <span className='dropbtnpos'>
                                                    <img src='/img/icon-acc.png' loading="lazy" alt="logo vseresepty.ru cooking recipes "/><span>{currentUser}</span>
                                                </span>
                                            </div>
                                            <span className='dropdownContentRight'>                                                
                                                <Link href={`/users/account/${currentUser}`}>Личный кабинет</Link>
                                                <Link href="/users/add_recipe">Добавить рецепт</Link>
                                                <div className="dropdownBtn">
                                                    <Button 
                                                        bgr={"none"} 
                                                        border={"none"} 
                                                        text={"Выйти"} 
                                                        cursor={"pointer"} 
                                                        hover={"background-color: #f2f2f2; border: solid 1px #f2f2f2;"} 
                                                        width={"100%"} 
                                                        textAlign={"left"} 
                                                        padding={"12px 20px"}
                                                        fontf={"Raleway-Medium"} 
                                                        onClick={logout}
                                                    >
                                                    </Button>
                                                </div>
                                            </span>
                                        </div>                           
                                    }
                            </div>                                                                 
                        </div> 
                    </div>
                </section>              
            </div>   
        </div>
    </div>
  )
}

export default Navbar