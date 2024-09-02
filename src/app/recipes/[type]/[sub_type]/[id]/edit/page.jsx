"use client";
import '../../../../styles-recipes.css';
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '@/context';
import DOMPurify from "dompurify";
import { useSession } from 'next-auth/react';
import Meta from '@/app/components/meta/page';

const EditRecipe = () => {
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();
    const path = process.env.PATH_API;    
    const currentUrl = usePathname();
    const [recipe, setRecipe] = useState([]);
    const type = usePathname().split("/")[2];
    const subtype = usePathname().split("/")[3]; 
    const id = usePathname().split("/")[4]; 
    const [title, setTitle] = useState("");   // название рецепта
    const [ingredients, setIngredients] = useState ("");    // список ингредиентов
    const [veg, setVeg] = useState(false);  // флаг вегетарианского блюда
    const [cooking, setCooking] = useState ();    // описание рецепта
    const [mainImg, setMainImg] = useState ("");    // основное фото
    const [additionalImg, setAdditionalImg] = useState ("");    // доп фото в раздел приготовление
    const [note, setNote] = useState ("");    // основное фото
    const [cook, setCook] = useState();      // описание рецепта в виде массива
    const [changeIngredients, setChangeIngredients] = useState (false);   
    const [changeCooking, setChangeCooking] = useState (false);  
    const [valueIngredient, setValueIngredient] = useState('');
    const [valueTitleIngredient, setValueTitleIngredient] = useState('');
    const [valueCooking, setValueCooking] = useState('');   
    const [valueTitleCooking, setValueTitleCooking] = useState(''); 
    const [arrI, setArrI] = useState([]);
    const [arrC, setArrC] = useState([]);
    const [arrC1, setArrC1] = useState([]);
    const session = useSession();
    const [user, setUser] = useState(null);
          
    useEffect (( ) => {
        if (currentUser) {setUser (currentUser)}
        else 
        if (session) {setUser (session?.data?.user.email)}
  
    }, [currentUser, session]);
        
            useEffect(() => {
                setIngredients (arrI.join(""));
            }, [arrI]);
        
            useEffect(() => {
                setCooking (arrC.join(""));
                setCook(JSON.stringify(arrC1));
            }, [arrC, arrC1]);
       
         
        const addIngredients = arrI.map((element, index) => {     
            return <div key={index}>            
                <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}}  onDoubleClick={() => removeIngredient(index)}></span>        
            </div>
        });
        
        const addCooking = arrC.map((element, index) => {     
            return <>            
                <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={element} onDoubleClick={() => removeCooking(index)}></span>        
            </>
        });
          
        const removeIngredient = ((index) => {
            setArrI([...arrI.slice(0, index), ...arrI.slice(index + 1)]);
        });
        
        const removeCooking = ((index) => {
            setArrC([...arrC.slice(0, index), ...arrC.slice(index + 1)]);
            setArrC1([...arrC1.slice(0, index), ...arrC1.slice(index + 1)])
        });

        

        const handleClick = async (e) => {
            const editRecipe = {
                    id: id,
                    name: title,
                    ingredients: ingredients,
                    cooking: cooking,
                    img_main: mainImg.name,
                    veg: veg,
                    note: note,
                    type: type,  
                    cook: cook,               
            }                   
             try {
                 await fetch (`/api/cooking/${type}/${subtype}/${id}/edit` , 
                 {
                     method: "POST",
                     body: JSON.stringify(editRecipe)
              }); 
        
             } catch (err) {
               console.log(err);
             }
             router.push(`/recipes/${type}/${subtype}/${id}`);
          };


    useEffect (( ) => {
        async function getRecipe() {
            const res = await fetch(`${path}cooking?type=${type}&id=${id}`, {
                method: "GET",
            })                    
            return res.json().then((data) => {
                setRecipe(data[0]);
                setTitle(data[0].name),
                setIngredients(data[0].ingredients),
                setCooking(data[0].cooking),
                setMainImg({name: data[0].img_main}),
                setVeg(data[0].veg),
                setNote(data[0].note), 
                setCook(data[0].cook) 
            }).catch((err) => {
                console.log(err);
            });
          }
          getRecipe();          
    }, [currentUrl]);


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


    const onSubmitAdd = async (e) => {
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
        {(recipe?.username!==user) && <div className='text-center mr-t-50'><p>Чтобы оставить отзыв требуется <a className="linkGray" href="/login" alt="">авторизация</a></p></div>}
        {(recipe?.username === user) &&   
        <div className='wrapRecipe'>  
            <div className='contentRecipe'>  
              <div className='addRecipes'>                
                <div> <h1>Редактировать рецепт</h1>
                <p>Измените или дополните рецепт, сохраните когда внесете необходимые изменения.</p>  
                        <div className='addRecipeHeader'>
                            <h2>Название блюда</h2>
                            <input type="text" name="title" placeholder={recipe.name} onChange={(e) => setTitle(e.target.value)} />                                
                        </div>
                        <div className='addRecipeNote'>
                            <h2>Краткое описание или особенности</h2>     
                            <textarea type="text" name="title" placeholder={recipe.note} onChange={(e) => setNote(e.target.value)} />                      
                        </div>
                        <div className='addMainImg'>                                
                                <h2>Фото рецепта</h2>   
                                    {(!recipe.img_main && !mainImg) && <img className='mainImgAva' src="/img/icon_image.png" alt={recipe.name}/>}
                                    {(recipe.img_main && !mainImg) && <img src={`http://localhost:3000/upload/${recipe.img_main}`} alt={recipe.name}/>}
                                    {mainImg && <><img src={`http://localhost:3000/upload/${mainImg.name}`} alt={recipe.name}/></>}                                                         
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
                                                    <div className='buttonWhite mr-b-15'>                                       
                                                        <button type="submit" className='mr-t-10'>ДОБАВИТЬ ФОТО БЛЮДА</button>                                                                                           
                                                    </div> 
                                                </form>
                                            </div>
                                        </div> 
                                    </label>                        
                        </div>                     
                    <div className='addIngredients'>                    
                            <h2>Ингредиенты</h2>
                            {!changeIngredients && <>
                                <div className='ingredientsList'>
                                    {recipe.ingredients && <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.ingredients)}}></div>}
                                </div>
                                <div className='buttonWhite' >
                                    <button className='mr-t-20 mr-b-15' onClick={() => setChangeIngredients(true)}>
                                        <span>ИЗМЕНИТЬ ИНГРЕДИЕНТЫ</span>
                                    </button>
                                </div>
                            </>
                            }
                            {changeIngredients && 
                            <>
                                <p>Введите по одному ингредиенту в строке, указывая количество. Для удаления или редактирования ингредиента дважды кликните на нем.</p>                                             
                                <div className='recipeText' >
                                    {addIngredients}                    
                                </div> 
                                <div className='addRecipeIngredients'>  
                                    <div className='ingredientsGroup'>
                                        <div className='buttonWhite ingredientsGroupP'>    
                                            <p className='mr-b-5 mr-t-30'>ГРУППА:</p>
                                            <input className='mr-b-15' value={valueTitleIngredient} onChange={event => setValueTitleIngredient(event.target.value)} placeholder="Например: Тесто"/>
                                            <button onClick={event => {setArrI([...arrI, `<h3>${valueTitleIngredient}</h3>`])}}>ДОБАВИТЬ ГРУППУ</button>
                                        </div> 
                                    </div>
                                    <div className='ingredientsGroup ingredientsGroupP'>
                                        <div className='buttonWhite mr-b-20'> 
                                            <p className='mr-b-5 mr-t-30'>ИНГРЕДИЕНТ:</p>
                                            <input className='mr-b-15' value={valueIngredient} onChange={event => setValueIngredient(event.target.value)} placeholder="Например: 200 мл воды"/>
                                            <button className='mr-b-15' onClick={event => {setArrI([...arrI, `<li>${valueIngredient}</li>`]); setArrC1([...arrC1, {cook: valueCooking}])}}><span>ДОБАВИТЬ ИНГРЕДИЕНТ</span></button>
                                        </div> 
                                    </div>
                                </div> 
                            </>
                            }
                    </div>

                    <div className='addIngredients pd-b-15'>                     
                            <h2 >Приготовление</h2>
                            {!changeCooking && 
                            <div id="recipe" className='buttonWhite ingredientsList'>
                                {recipe.cooking && <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.cooking)}}></div>}
                                <button className='mr-t-20' onClick={() => setChangeCooking(true)}><span>ИЗМЕНИТЬ ПРИГОТОВЛЕНИЕ</span></button>
                            </div> 
                            }
                            {changeCooking && <>
                                <p>Опишите как готовить ваше блюдо по шагам, добавляя имеющиеся фото к каждому шагу. Для удаления контента дважды кликните на нем в шаблоне. В шаблоне будет примерно отображено как ваш рецепт будет отображаться на сайте.</p>                 
                                <div className='recipeText'>
                                    <div>
                                        {addCooking}  
                                    </div>
                                                   
                                </div> 
                                <div className='addRecipeCooking'>  
                                    <div className='ingredientsGroup'>
                                        <div>  
                                            <p className='mr-b-5'>НОМЕР ШАГА:</p>  
                                            <input className='mr-b-15' value={valueTitleCooking} onChange={event => setValueTitleCooking(event.target.value)} placeholder="Например: 1"/>
                                            <div className='buttonWhite'>
                                                <button onClick={event => {setArrC([...arrC, `<h3>Шаг ${valueTitleCooking}</h3>`]); setArrC1([...arrC1, {step: valueTitleCooking}])}}>ДОБАВИТЬ НОМЕР ШАГА</button>
                                            </div>
                                        </div> 
                                    </div>
                                    <div> 
                                        <div className='ingredientsGroup'>
                                            <p className='mr-t-50 mr-b-5'>ПРИГОТОВЛЕНИЕ:</p>  
                                            <input className='mr-b-15' value={valueCooking} onChange={event => setValueCooking(event.target.value)} placeholder="Например: Овощи почистить и мелко нарезать."/>
                                            <div className='buttonWhite'>
                                                <button onClick={event => {setArrC([...arrC, `<p>${valueCooking}</p>`]); setArrC1([...arrC1, {cook: valueCooking}])}}><span>ДОБАВИТЬ ПРИГОТОВЛЕНИЕ</span></button>
                                            </div>
                                        </div>
                                    </div> 
                                </div> 
                                <div>
                                <p className='mr-t-50'>ФОТО БЛЮДА НА ДАННОМ ШАГЕ:</p>                                                                                           
                                    <label htmlFor="fileAdd"> 
                                        <div className='mainImg'>
                                            <div>
                                                {!additionalImg && <div className='addImg'><img src="/img/icon_image.png" alt="food"/></div>}
                                                {additionalImg && <img src={`http://localhost:3000/upload/${additionalImg.name}`} alt={recipe.name}/>}
                                                <form onSubmit={onSubmitAdd}>
                                                    <input  
                                                     className='mr-t-10 mr-b-15'                                                 
                                                    type="file" 
                                                    id="fileAdd"
                                                    name="fileAdd"
                                                    accept=".jpg, .jpeg, .png" 
                                                    multiple={false} 
                                                    onChange={(e)=> {setAdditionalImg(e.target.files?.[0])}}/>      
                                                    <div className='buttonWhite'>                                       
                                                        <button type="submit"  onClick={() => {setArrC([...arrC, `<img src="/upload/${additionalImg.name}"/>`]); setArrC1([...arrC1, {img: additionalImg.name}])}} >ДОБАВИТЬ ФОТО БЛЮДА</button>                                                                                           
                                                    </div> 
                                                </form>
                                            </div>
                                        </div> 
                                    </label>   
                                </div>
                              </>
                            }
                        </div>
                        <div className='addCathegory'>
                        <h2>Это блюдо вегетарианское?</h2>
                            <div >
                                <label className="switch">
                                    <input type="checkbox" onChange={event => {if (event.target.checked) setVeg(1); else setVeg(0)}} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div> 
                        <div className='buttonRightWrap'>
                            <button className='buttonTransparent'><span><a href={`/recipes/${type}/${subtype}/${id}`}>ОТМЕНИТЬ</a></span></button>
                            <button className='buttonOrange' onClick={handleClick}>Сохранить Рецепт</button>
                        </div>
                     </div>
                  </div>              
               </div>
             </div>

        }
    </div>
  )
}

export default EditRecipe