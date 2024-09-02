"use client";
import '../styles-recipes.css';
import { usePathname } from 'next/navigation'
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context';
import StarRating from '@/app/components/star_rating/page';
import Meta from '@/app/components/meta/page';

const FoodType = () => {
    const { auth } = useContext(AuthContext);
    const path = process.env.PATH_API;    
    const mainCat = usePathname().split("/")[1];
    const cat = usePathname().split("/")[2];
    const [typeRecipe, setTypeRecipe] = useState();
    const [subtypeRecipe, setSubtypeRecipe] = useState();
    const [recipes, setRecipes] = useState();
    const [imgGallery, setImgGallery] = useState();
    const [typeCook, setTypeCook] = useState();

    useEffect (( ) => {
        auth;
        if (cat==="kitchen") {    
            setTypeCook("кухня")
        }      
        if (cat==="main") {
            setTypeCook("основные блюда")
        }           
        if (cat==="soup") {
            setTypeCook("супы")
        }  
        if (cat==="second") {
            setTypeCook("вторые блюда")
        }  
        if (cat==="salad") {
            setTypeCook("салаты")
        }  
        if (cat==="pelmeni") {
            setTypeCook("пельмени манты")
        }  
        if (cat==="snacks") {
            setTypeCook("закуски")
        }  
        if (cat==="dough") {
            setTypeCook("тесто и десерт")
        }  
        if (cat==="drink") {
            setTypeCook("напитки")
        }  
        if (cat==="multi") {
            setTypeCook("мультиварка")
        }  
    }, [cat])  

    useEffect (( ) => {
        async function getTypes() {
            const res = await fetch(`${path}cooking?recipes_types=${cat}`, {
                method: "POST",
            })                    
            return res.json().then((data) => {
                setTypeRecipe (data[0]?.type);
                setSubtypeRecipe (JSON.parse(data[0]?.sub_types));
                setImgGallery(data[0]?.main_gallery);
                console.log ("data[0]", data[0])
            }).catch((err) => {
                console.log(err);
            });
          }
          getTypes();

        async function getRecipes() {
            const res = await fetch(`${path}cooking?type=${cat}`, {
                method: "GET",
            })                    
            return res.json().then((data) => {
                setRecipes(data);
            }).catch((err) => {
                console.log(err);
            });
          }
          getRecipes();
    }, [cat])

  return (
    <div>   
        <Meta
            title= {`${typeCook} рецепты приготовления проверенных вкусных блюд;${cat}:recipes delicious dish cook`} 
            description={`${typeCook} рецепты приготовления вкусных блюд пошагово с фото;${cat}:recipes preparing delicious dishes`} 
            keywords={`${typeCook}, список рецептов, вкусные рецепты, различные блюда, приготовить еду, кулинарные рецепты, вкусно, просто, по шагам, праздничное, с фото, ${cat}, preparing cook dish, recipe, tasty dishes`} 
            robots="noindex"
        />     
        {imgGallery && <div className='gallery'><img  loading="lazy" src={`${imgGallery}`} alt={`${mainCat} ${cat}`} /></div>}        
        <div className='wrapRecipes'>  
        <div className='headerRecipe'>              
            <div className='breadcrumbs text-center'>
                <a href={`/${mainCat}`}>РЕЦЕПТЫ</a><><span> / {typeCook}</span></>                                           
            </div>   
            {(cat==="kitchen") && <>                
                <h1>Вид кухни</h1>   
                <p>Хотите приготовить что-то необычное, или предпочитаете местную кухню?</p></>                                                       
            }
            {(cat==="main") && <>
                <h1>Основные блюда</h1> 
                <p>Самые популярные блюда для ежедневного здорового питания - бульоны, гарниры, крупы, каши и другие рецепты самостоятельных или составных блюд к вашему вниманию.</p>
                </>                                          
            }
            {(cat==="soup") && <>
                <h1>Супы</h1>
                <p>Горячие, холодные, веганские, в духовке, супы-пюре - готовим супчики на любой вкус!</p></>                                           
            }
            {(cat==="second") && <>
                <h1>Мясо, рыба и гарниры</h1> 
                <p>Хотите приготовить что-то необычное, или предпочитаете что-нибудь из проверенных веками родных рецептов?</p></>                                          
            }
            {(cat==="salad") && <>
                <h1>Салаты</h1>                                           
                <p>Сложно представить себе русскую кухню без всевозможных салатов! Как каллорийные, так и диетические - украсят любой стол и поднимут ваше настроение!</p>
                </>
            }
            {(cat==="pelmeni") && <>
                <h1>Пельмени, манты, хинкали и т.д.</h1>  
                <p>Беспроигрышное сочетание теста и начинки, встречающееся у многих народов мира в разном исполнении - пельмени, вареники, колдуны, кундюмы, манты, хинкали, гедза, равиоли, кропкакор, дамплинги и др. - являются вкуснейшими блюдами, которые были изобретены много веков назад. Это кулинарные шедевры требующие для приготовления времени и усердия, но результат безусловно того стоит! Не отчаивайтесь если что-то не будет получаться сразу, с опытом ваши старания обязательно окупятся и вы станете настоящим профессионалом, с багажом секретов приготовления и вашими личными выверенными и усовершенствоанными рецептами. </p>                                                
                </>                                         
            }
            {(cat==="snacks") && <>
                <h1>Закусочные блюда</h1> 
                <p>Украшение праздничных столов - всевозможные рулетики с вкуснейшей начинкой, разноцветные канапе, тартаретки с салатиками, с икрой, рыбой - отличный выбор для аппетитного и красивого стола, который позволит реализовать вам не только кулинарные, но и творческие способности!</p></>                                          
            }
            {(cat==="dough") && <>
                <h1>Тесто, десерты</h1>
                <p>Приготовленные с любовью - хлеб, блины, пицца - подарят истинное наслаждение вам и вашим близким. Вкусные пироги и пирожки, кремовые торты и пирожные - готовим душевные блюда из теста и десерты!</p></>                                           
            }
            {(cat==="drink") && <>
                <h1>Напитки горячие и холодные</h1> 
                <p>Душистый чай и ароматный кофе уютно согреют, прохладительные напитки из натуральных ингредиентов подарят прохладу и утолят жажду, смузи и компоты, кисели и морсы наполнят витаминами. Напитки приготовленные своими руками - это просто, вкусно и полезно!</p></>                                          
            }
            {(cat==="multi") && <>
                <h1>Блюда в мультиварке</h1> 
                <p>Готовить в мультиварке одно удовольствие - получается у всех, готовить просто, и в мультиварке можно приготовить практически все! Даже начинающие хозяйки будут готовить как профессиональные повара - необходимо только загрузить ингредиенты и выбрать режим, а температура и время приготовления будут выставлены автоматически.</p></>                                          
            }
            </div>
            {subtypeRecipe && <>
                <div className="typeRecipe">
                    {Object.entries(subtypeRecipe).map(([key, value]) =>                         
                        <div key={key+value}>
                            <a href={`/recipes/${cat}/${value}`}>{key}</a>
                        </div>                    
                    )} 
                </div>
            </>}
            
            <h2>Все рецепты</h2>
            <div className="rowsRecipes">
                {recipes && 
                    <>
                        {recipes.map((recipe) => 
                            <div key={recipe.id}>
                                <img src={`/upload/${recipe.img_main}`} alt={recipe.name} loading="lazy"/>
                                <span className='recipe_title'>
                                    <span className='type'>{recipe.type}</span>
                                    <span className='title'><a href={`/recipes/${typeRecipe}/${recipe.type}/${recipe.id}`}>{recipe.name}</a></span>                                            
                                    <span className='rating_stars_list'>      
                                            <span className='pd-r-10'>             
                                                <StarRating                    
                                                    count={5}
                                                    size = {24}
                                                    rating = {recipe.rating}
                                                ></StarRating>  
                                            </span>   
                                            <span className='ratingList'>Рейтинг</span>
                                        </span> 
                                </span>
                            </div>
                        )}                
                    </>
                }
            </div>
        </div>
    </div> 
  )
}

export default FoodType