"use client";
import Navbar from '@/app/components/navbar/Navbar';
import DOMPurify from "isomorphic-dompurify";
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '@/context';
import { useSession } from 'next-auth/react';
import '../../components/navbar/styles-navbar.css'
import Meta from '@/app/components/meta/page';





const AddRecipe = () => {
    const {currentUser} = useContext (AuthContext);
    const [title, setTitle] = useState("");   // название рецепта
    const [ingredients, setIngredients] = useState ("");    // список ингредиентов
    const [veg, setVeg] = useState(0);  // флаг вегетарианского блюда
    const [cooking, setCooking] = useState ("");    // описание рецепта
    const [mainImg, setMainImg] = useState ("");    // основное фото
    const [additionalImg, setAdditionalImg] = useState ("");    // доп фото в раздел приготовление
    const [note, setNote] = useState ("");    // краткое описание  
    const [cook, setCook] = useState([]);     // описание рецепта в виде массива  
    const [type, setType] = useState("");  // тип рецепта
    const [subType, setSubType] = useState("");  // подтип рецепта 
    const [errorArr, setErrorArr] = useState (false);    
    const [errorTitle, setErrorTitle] = useState (false); 
    const [errorMainImg, setErrorMainImg] = useState (false); 
    const [errorIngredients, setErrorIngredients] = useState (false); 
    const [errorСooking, setErrorСooking] = useState (false); 
    const [errorType, setErrorType] = useState (false); 
    const [arrI, setArrI] = useState(['']);
    const [arrC, setArrC] = useState([]);
    const [arrC1, setArrC1] = useState([]);
    const [valueIngredient, setValueIngredient] = useState('');
    const [valueTitleIngredient, setValueTitleIngredient] = useState('');
    const [valueCooking, setValueCooking] = useState('');   
    const [valueTitleCooking, setValueTitleCooking] = useState(''); 
    const [user, setUser] = useState(null);
    const session = useSession();
    const router = useRouter();
    

    useEffect (( ) => {
        if (title.length>0) {            
            let trimStr = title.trim();   // удаление пробелов в начале и в конце
            let trimStr1 = trimStr.replace(/\s+/g, ' ').trim();  // удаление всех лишних пробелов 
            setTitle(trimStr1);
            setErrorTitle(true);
         }
        else setErrorTitle(false);
    }, [title]);

    useEffect (( ) => {
        if (mainImg) {            
            setErrorMainImg(true)
         }
        else setErrorMainImg(false);      
    }, [mainImg]);

    useEffect (( ) => {
        if (ingredients.length > 0) {            
            setErrorIngredients(true)
         }
        else setErrorIngredients(false);      
      }, [ingredients]);

    useEffect (( ) => {
        if (cook.length > 0) {            
            setErrorСooking(true)
         }
        else setErrorСooking(false);     
     }, [cook]);

    useEffect (( ) => {
        if (type.length > 0) {            
            setErrorType(true)
         }
        else setErrorType(false);    
    }, [type]);

    useEffect (( ) => {       
        if (errorTitle && errorMainImg && errorIngredients && errorСooking && errorType) {        
            setErrorArr (true)
         }
        else setErrorArr (false);  
    }, [errorTitle,errorMainImg, errorIngredients, errorСooking, errorType]);
       
    useEffect (( ) => {
        if (currentUser) {setUser (currentUser)}
        else 
        if (session) {setUser (session?.data?.user.email)}  
    }, [currentUser, session]);
    
    const addIngredients = arrI.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={element} onDoubleClick={() => removeIngredient(index)}></span>        
        </>
    }); 

    const addCooking = arrC.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={element} onDoubleClick={() => removeCooking(index)}></span>        
        </>
    });

    const removeIngredient = ((index) => {
        setArrI([...arrI.slice(0, index), ...arrI.slice(index + 1)])
    });

    const removeCooking = ((index) => {
        setArrC([...arrC.slice(0, index), ...arrC.slice(index + 1)]);
        setArrC1([...arrC1.slice(0, index), ...arrC1.slice(index + 1)]);
    });

    const handleClick = async (e) => {
        if (!errorTitle || !errorMainImg || !errorIngredients || !errorСooking || !errorType) {
            setErrorArr(false);
        }
        else {
            setErrorArr(true);    
            let cookingJson = JSON.stringify(cook);
            let today = new Date().toISOString().slice(0, 10)
            const recipe = {
                name: title,
                ingredients: ingredients,
                cooking: cooking,
                img_main: mainImg.name,
                type: subType,
                veg: veg,
                typeRecipe: type,
                note: note,
                review: JSON.stringify({"params": []}),
                cook: cookingJson,
                username: user,
                date: today,
            }

            try {
                await fetch (`/api/users/add_recipe` , 
                {
                    method: "PUT",
                    body: JSON.stringify(recipe)
                }); 
        
            } catch (err) {
            console.log(err);
            }
            router.push(`/recipes/${type}`);
        }
    };

    useEffect(() => {
        setIngredients (arrI.join(""));
    }, [arrI]);

    useEffect(() => {
        setCooking (arrC.join(""));
        setCook(arrC1);
    }, [arrC, arrC1]);

    const addImg = async (e) => {
        e.preventDefault();
        if (!mainImg) return;
        try {
            const data = new FormData();
            data.set('file', mainImg);
            const res = await fetch ("/api/upload", {
                method: "POST",
                body: data
            })
            if (!res.ok) throw new Error(await res.text())
            }
        catch {(e)=> console.log (e)}
    }
    
    const addImgAdd = async (e) => {
        e.preventDefault();
        if (!additionalImg) return;
        try {
            const data = new FormData();
            data.set('file', additionalImg);
            const res = await fetch ("/api/upload", {
                method: "POST",
                body: data
            })
            if (!res.ok) throw new Error(await res.text())
            }
        catch {(e)=> console.log (e)}
    }

  
  return (
    <div> 
        <Meta robots="noindex"/> 
        <Navbar/>
        <div>
        {(!user && (!session?.data))  && 
            <div className='text-center'>
                <h1>Доступ запрещен</h1>
                <div className='registrationLink'>
                    <p>Для добавления рецепта требуется <a href="/login" alt="авторизация Vseresepty.ru">авторизация</a></p>
                </div>
            </div>
        }
        {(user || session?.data) &&   
            <div className='addRecipes'>
                <div>
                    <h1>Добавить рецепт</h1>
                    <p>Загрузить рецепт на сайт просто! Поделитесь своим любимым блюдом с родными, друзьями и другими гурманами со всего мира.</p>
                    <div className='addRecipeContent'>   
                            <div className='addRecipeHeader'>
                                <h2>Название блюда</h2>
                                <div>
                                    <input type="text" name="title" placeholder="Дайте название вашему блюду" onChange={(e) => {setTitle(e.target.value)}} />                                                                 
                                </div> 
                                {(!errorTitle) && <div className='error pd-b-15'>Заполните название</div>}
                            </div>
                           
                            <div className='addRecipeNote'>
                                <h2>Краткое описание или особенности</h2>     
                                <div>
                                    <textarea type="text" name="title" placeholder="Опишите кратко особенности вашего блюда" onChange={(e) => setNote(e.target.value)} />                      
                                </div>
                            </div>
                            <div className='addMainImg'>                                
                                    <h2>Фото рецепта</h2>
                                    {!mainImg && <img className='mainImgAva' src="/img/icon_image.png" loading="lazy" alt="food еда"/>}
                                    {mainImg?.name && <><img src={`http://localhost:3000/upload/${mainImg.name}`} alt={`"фото блюда ${title}"`} loading="lazy"/></>} 
                                    <label htmlFor="file">
                                        <div className='mainImg'>
                                            <div>                                               
                                                <form onSubmit={addImg}>
                                                    <input 
                                                    className='mr-t-20'                                                    
                                                    type="file" 
                                                    id="file"
                                                    name="file"
                                                    accept=".jpg, .jpeg, .png" 
                                                    multiple={false} 
                                                    onChange={(e)=> {setMainImg(e.target.files?.[0])}}/>      
                                                    <div className='buttonWhite'>                                       
                                                        <button className='mr-t-10 mr-b-15' type="submit" >ДОБАВИТЬ ФОТО БЛЮДА</button>                                                                                           
                                                    </div> 
                                                </form>
                                            </div>
                                        </div> 
                                    </label>
                                    {!errorMainImg && <div className='error mr-t-15 mr-b-15'>Загрузите основное фото рецепта</div>}
                            </div>                 
                        <div className='addIngredients'>                    
                                <h2>Ингредиенты</h2>
                                <p>Введите по одному ингредиенту в строке, указывая количество. В шаблоне будет примерно отображено как ингредиенты вашего рецепта будет отображаться на сайте. Для удаления ингредиента дважды кликните на нем в шаблоне ингредиентов.</p>                 
                                <div className='recipeText'>
                                    <div>
                                        {addIngredients}     
                                    </div>                                                  
                                </div> 
                                {!errorIngredients && <div className='error mr-t-15'>Заполните ингредиенты</div>} 
                                <div className='ingredientsGroup mr-b-15'>  
                                    <div className='buttonWhite ingredientsGroupP'>
                                        <p className='mr-b-5 mr-t-30'>ГРУППА:</p>
                                        <input className='mr-b-15' value={valueTitleIngredient} onChange={event => setValueTitleIngredient(event.target.value)} placeholder="Например: Тесто"/>
                                             
                                            <button onClick={event => setArrI([...arrI, `<h3>${valueTitleIngredient}</h3>`])}>
                                            <span className='iconPlus'></span>ДОБАВИТЬ ГРУППУ
                                            </button>
                                    </div>
                                    <div className='buttonWhite ingredientsGroupP'> 
                                        <p className='mr-b-5 mr-t-30'>ИНГРЕДИЕНТ:</p>
                                        <input className='mr-b-15' value={valueIngredient} onChange={event => setValueIngredient(event.target.value)} placeholder="Например: 200 мл воды"/>
                                            <button onClick={event => setArrI([...arrI, `<li>${valueIngredient}</li>`])}>
                                                <span className='iconPlus'></span>
                                                ДОБАВИТЬ ИНГРЕДИЕНТ
                                            </button>
                                    </div>                                                                
                                </div> 
                        </div>
                        <div className='addIngredients'>                    
                                <h2>Приготовление</h2>
                                <p>Опишите как готовить ваше блюдо по шагам, добавляя имеющиеся фото к каждому шагу. В шаблоне будет примерно отображено как ваш рецепт будет отображаться на сайте. Для удаления контента дважды кликните на нем в шаблоне приготвовления.</p>                 
                                <div className='recipeText'>
                                    <div>
                                    {addCooking}     
                                    </div>               
                                </div> 
                                {!errorСooking && <div className='error mr-t-15'>Опишите рецепт по шагам</div>}
                                <div className='addRecipeCook'>  
                                    <div className='ingredientsGroup mr-t-50'>  
                                            <p className='mr-b-5'>НОМЕР ШАГА:</p> 
                                            <input value={valueTitleCooking} onChange={event => setValueTitleCooking(event.target.value)} placeholder="Например: 1"/>
                                            <div className='buttonWhite'>
                                                <button className='mr-t-15' onClick={event => {setArrC([...arrC, `<h3>Шаг ${valueTitleCooking}</h3>`]); setArrC1([...arrC1, {step: valueTitleCooking}])}}>
                                                    ДОБАВИТЬ НОМЕР ШАГА
                                                </button>
                                            </div>
                                        </div>                                     
                                    <div className='ingredientsGroup mr-t-50'> 
                                        <p className='mr-b-5'>ПРИГОТОВЛЕНИЕ:</p> 
                                        <input value={valueCooking} onChange={event => {setValueCooking(event.target.value); }} placeholder="Например: Овощи почистить и мелко нарезать."/>
                                        <div className='buttonWhite'>
                                            <button className='mr-t-15' onClick={event => {setArrC([...arrC, `<p>${valueCooking}</p>`]); setArrC1([...arrC1, {cook: valueCooking}])}}>
                                                ДОБАВИТЬ ПРИГОТОВЛЕНИЕ
                                            </button>
                                        </div>
                                    </div> 
                                </div> 
                                
                                    <p className='mr-t-50'>ФОТО БЛЮДА НА ДАННОМ ШАГЕ:</p>                                    
                                    <label htmlFor="fileAdd">
                                        <div className='mainImg mr-t-20'>
                                            <div>
                                                {!additionalImg && <img className='mainImgAva mr-b-15' loading="lazy" src="/img/icon_image.png" alt="food"/>}
                                                {additionalImg?.name && <img src={`http://localhost:3000/upload/${additionalImg.name}`} loading="lazy" alt={`"фото блюда ${title}"`}/>}
                                            </div>
                                            <form onSubmit={addImgAdd}>
                                                <input 
                                                 className='mr-t-10 mr-b-15'
                                                    type="file" 
                                                    id="fileAdd"
                                                    name="fileAdd"
                                                    accept=".jpg, .jpeg, .png" 
                                                    multiple={false} 
                                                    onChange={(e)=> {setAdditionalImg(e.target.files?.[0])}}/> 
                                                <div className='buttonWhite'>                                       
                                                    <button className='mr-b-15' type="submit" onClick={() => {setArrC([...arrC, `<img loading="lazy" alt="${title}" src="/upload/${additionalImg.name}"/>`]); setArrC1([...arrC1, {img: additionalImg.name}])}}>
                                                        ДОБАВИТЬ ФОТО В ШАБЛОН
                                                    </button>                                                                                           
                                                </div>
                                            </form>
                                        </div> 
                                    </label>                                   
                            </div>
                            <div className='addCathegory'> 
                            <h2>Выбор разделов</h2>
                            <div>
                                <p>Выберете раздел и подраздел вашего рецепта:</p>
                                {!errorType && <div className='error mr-t-15'>Выберите раздел и подраздел</div>}
                                <div>
                                    <input type="radio" checked={type === "kitchen"} name="kitchen" value="kitchen" id="kitchen" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('rus')}}/>
                                    <label htmlFor="kitchen">Кухня</label>                        
                                </div>                   
                                {type==="kitchen" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="rus">Русская</option> 
                                            <option value="eur">Европейская</option> 
                                            <option value="kavk">Кавказская</option> 
                                            <option value="turk">Тюркская</option> 
                                            <option value="asia">Азиатская</option> 
                                            <option value="pan">Паназиатcкая</option> 
                                            <option value="ind">Индийская</option> 
                                        </select>
                                    </div>
                                    }
                                <div>
                                    <input type="radio" checked={type === "main"} name="cat" value="main" id="main" className="custom-checkbox" onChange={(e) =>  {setType(e.target.value); setSubType('bouillon')}}/>
                                    <label htmlFor="main">Основные блюда</label>
                                </div>
                                {type==="main" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="bouillon">Бульоны</option> 
                                            <option value="cereals">Крупы и каши</option> 
                                            <option value="garnish">Гарниры</option> 
                                            <option value="sauces">Соусы</option> 
                                            <option value="base">Основы и заготовки</option> 
                                        </select>
                                    </div>
                                    }
                                <div>
                                    <input type="radio" checked={type === "soup"} name="cat" value="soup" id="soup" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('meat')}}/>
                                    <label htmlFor="soup">Супы</label>
                                </div>
                                {type==="soup" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="meat">Мясные</option> 
                                            <option value="fish">Рыба, морепродукты</option> 
                                            <option value="veg">Вегетарианские</option> 
                                            <option value="pure">Супы-Пюре</option> 
                                            <option value="cold">Холодные</option> 
                                            <option value="bbq">На мангале</option> 
                                        </select>
                                    </div>
                                    }
                                <div>
                                    <input type="radio" checked={type === "second"} name="cat" value="second" id="second" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('meat')}}/>
                                    <label htmlFor="second">Вторые блюда</label>
                                </div>
                                {type==="second" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="meat">Мясо</option> 
                                            <option value="fish">Рыба, морепродукты</option> 
                                            <option value="bird">Птица</option> 
                                            <option value="veg">Вегетарианские</option> 
                                            <option value="bbq">На мангале</option> 
                                        </select>
                                    </div>
                                    }
                                <div>
                                    <input type="radio" checked={type === "salad"} name="cat" value="salad" id="salad" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('meat')}}/>
                                    <label htmlFor="salad">Салаты</label>
                                </div>
                                {type==="salad" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="meat">Мясные</option> 
                                            <option value="fish">Рыбные, с морепродуктами</option> 
                                            <option value="warm">Теплые</option> 
                                            <option value="fruit">Фруктовые</option> 
                                            <option value="veg">Вегетарианские</option> 
                                        </select>
                                    </div>
                                    }
                                <div>
                                    <input type="radio" checked={type === "pelmeni"} name="cat" value="pelmeni" id="pelmeni" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('meat')}}/>
                                    <label htmlFor="pelmeni">Пельмени и манты</label>
                                </div>
                                {type==="pelmeni" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="meat">С мясом</option> 
                                            <option value="fish">Рыба, морепродукты</option> 
                                            <option value="veg">Вегетарианские</option> 
                                        </select>
                                    </div>
                                }
                                <div>
                                    <input type="radio" checked={type === "snacks"} name="cat" value="snacks" id="snacks" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('roll')}}/>
                                    <label htmlFor="snacks">Закуски</label>
                                </div>
                                {type==="snacks" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="roll">Рулеты, роллы, рулетики</option> 
                                            <option value="salad">Салатные</option> 
                                            <option value="pickles">Маринады, соленья</option> 
                                            <option value="veg">Вегетарианские</option> 
                                        </select>
                                    </div>
                                }
                                <div>
                                    <input type="radio" checked={type === "dough"} name="cat" value="dough" id="dough" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('gateau')}}/>
                                    <label htmlFor="dough">Тесто, десерт</label>
                                </div>
                                {type==="dough" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="dough">Блюда из теста</option>  
                                            <option value="sweet">Сладкая выпечка</option>
                                            <option value="dessert">Десертные блюда</option>                                                                                      
                                        </select>
                                    </div>
                                }
                                <div>
                                    <input type="radio" checked={type === "drink"} name="cat" value="drink" id="drink" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('tea')}}/>
                                    <label htmlFor="drink">Напитки</label>
                                </div>
                                {type==="drink" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="tea">Чай</option> 
                                            <option value="cof">Кофе</option> 
                                            <option value="cold">Прохладительные</option> 
                                            <option value="komp">Морсы, компоты, кисели</option> 
                                            <option value="smooth">Смузи, коктейли</option> 
                                        </select>
                                    </div>
                                }
                                                                <div>
                                    <input type="radio" checked={type === "multi"} name="cat" value="multi" id="multi" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('soup')}}/>
                                    <label htmlFor="multi">Мультиварка</label>
                                </div>
                                {type==="multi" && 
                                    <div className='selectRecipe'>
                                        <select onChange={(e) => setSubType(e.target.value)}> 
                                            <option value="soup">Супы</option> 
                                            <option value="second">Вторые</option> 
                                            <option value="dough">Тесто, десерт</option> 
                                            <option value="main">Основы, заготовки</option> 
                                        </select>
                                    </div>
                                }
                                <div className='addCathegory'> 
                                <h2>Это блюдо вегетарианское?</h2>
                                    <div className='switch'>
                                        <label className="switch">
                                            <input type="checkbox" onChange={event => {if (event.target.checked) setVeg(1); else setVeg(0)}} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div> 
                                <div className='error'>{!errorArr && <>Заполните пожалуйста необходимые поля</>}</div>
                                <div className='buttonRightWrap'>
                                    <button className='buttonTransparent'><span><a href="/recipes">ОТМЕНИТЬ</a></span></button>
                                    {errorArr &&<button className='buttonOrange' onClick={handleClick}>Сохранить Рецепт</button>}
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>            
            </div>
        }
        </div>
    </div>
  )
}

export default AddRecipe
