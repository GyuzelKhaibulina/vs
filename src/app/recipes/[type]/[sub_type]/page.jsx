"use client";
import '../../styles-recipes.css';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import StarRating from '@/app/components/star_rating/page';
import Meta from '@/app/components/meta/page';


const FoodCategory = () => {
    const path = process.env.PATH_API;    
    const subtype = usePathname().split("/")[3]
    const cat = usePathname().split("/")[2];
    const [recipes, setRecipes] = useState();
    const [typeRecipe, setTypeRecipe] = useState();
    const [subTypeRecipe, setSubTypeRecipe] = useState();

    useEffect (( ) => {
        async function getTypeRecipes() {
            
             const res = await fetch(`${path}cooking?type=${cat}&subtype=${subtype}`, {
                 method: "GET",
             })                    
             return res.json().then((data) => {             
                 //setTypeRecipe (data[0]?.type);
                 setRecipes(data)
             }).catch((err) => {
                 console.log(err);
             });
           }
           getTypeRecipes();

           if (cat==="kitchen")
           {
                setTypeRecipe("Кухня");
                if (subtype==="rus") setSubTypeRecipe("Русская"); 
                if (subtype==="eur") setSubTypeRecipe("Европейская");   
                if (subtype==="kavk") setSubTypeRecipe("Кавказская"); 
                if (subtype==="turk") setSubTypeRecipe("Тюркская"); 
                if (subtype==="asia") setSubTypeRecipe("Азиатcкая"); 
                if (subtype==="pan") setSubTypeRecipe("Паназиатcкая"); 
                if (subtype==="ind") setSubTypeRecipe("Индийская"); 
           }
           if (cat==="main")
           {
                setTypeRecipe("Основные");
                if (subtype==="bouillon") setSubTypeRecipe("Бульоны");  
                if (subtype==="cereals") setSubTypeRecipe("Каши, крупы"); 
                if (subtype==="garnish") setSubTypeRecipe("Гарниры"); 
                if (subtype==="sauces") setSubTypeRecipe(" Соусы"); 
                if (subtype==="base") setSubTypeRecipe("Основы и заготовки"); 
           }
           if (cat==="soup")
           {
                setTypeRecipe("Супы");
                if (subtype==="meat") setSubTypeRecipe("Мясные"); 
                if (subtype==="fish") setSubTypeRecipe("Рыба, морепродукты"); 
                if (subtype==="pure") setSubTypeRecipe("Супы-Пюре");                       
                if (subtype==="veg") setSubTypeRecipe("Вегетарианские"); 
                if (subtype==="cold") setSubTypeRecipe("Холодные"); 
                if (subtype==="bbq") setSubTypeRecipe("На мангале"); 
           }
           if (cat==="second")
           {
                setTypeRecipe("Вторые блюда");
                if (subtype==="meat") setSubTypeRecipe("Мясо");  
                if (subtype==="bird") setSubTypeRecipe("Птица"); 
                if (subtype==="fish") setSubTypeRecipe("Рыба, морепродукты");                        
                if (subtype==="veg") setSubTypeRecipe("Вегетарианские"); 
                if (subtype==="bbq") setSubTypeRecipe("На мангале"); 
           }
           if (cat==="salad")
           {
                setTypeRecipe("Салаты");
                if (subtype==="meat") setSubTypeRecipe("Мясные");
                if (subtype==="fish") setSubTypeRecipe("Рыба, морепродукты");
                if (subtype==="veg") setSubTypeRecipe("Вегетарианские");
                if (subtype==="warm") setSubTypeRecipe("Теплые");
                if (subtype==="fruit") setSubTypeRecipe("Фруктовые");
           }
           if (cat==="pelmeni")
           {
                setTypeRecipe("Пельмени");
                if (subtype==="meat") setSubTypeRecipe("С мясом");
                if (subtype==="fish") setSubTypeRecipe("Рыба, морепродукты");
                if (subtype==="veg") setSubTypeRecipe("Вегетарианские");
           }
           if (cat==="snacks")
           {
                setTypeRecipe("Закуски");
                if (subtype==="roll") setSubTypeRecipe("Рулеты, роллы");
                if (subtype==="salad") setSubTypeRecipe("Салатные");
                if (subtype==="pickles") setSubTypeRecipe("Маринады, соленья");
                if (subtype==="veg") setSubTypeRecipe("Вегетарианские");
           }
           if (cat==="dough")
           {
                setTypeRecipe("Тесто и десерт");
                if (subtype==="dough") setSubTypeRecipe("Блюда из теста");
                if (subtype==="sweet") setSubTypeRecipe("Сладкие блюда из теста");
                if (subtype==="dessert") setSubTypeRecipe("Десертные блюда");
           }
           if (cat==="drink")
           {
                setTypeRecipe("Напитки");
                if (subtype==="cold") setSubTypeRecipe("Прохладительные");
                if (subtype==="smooth") setSubTypeRecipe("Смузи");
                if (subtype==="cocktails") setSubTypeRecipe("Коктейли");
                if (subtype==="compote") setSubTypeRecipe("Морсы, компоты");
                if (subtype==="tea") setSubTypeRecipe("Чаи");
                if (subtype==="coffee") setSubTypeRecipe("Кофе");
           }
           if (cat==="multi")
           {
                setTypeRecipe("Мультиварка");
                if (subtype==="soup") setSubTypeRecipe("Супы");
                if (subtype==="second") setSubTypeRecipe("Вторые блюда");
                if (subtype==="dough") setSubTypeRecipe("Тесто, десерт");
                if (subtype==="main") setSubTypeRecipe("Заготовки, основы");                                        
           }

    }, [cat, subtype])


  return (
    <div>    
        <Meta 
        title={`${typeRecipe} ${subTypeRecipe} рецепты приготовления вкусных блюд с пошаговым фото recipes cooking preparing delicious dish`}
        description={`${typeRecipe} ${subTypeRecipe} рецепты приготовления вкусных блюд recipes preparing delicious dishes`}
        keywords={`${typeRecipe} ${subTypeRecipe} рецепт блюд, готовить рецепт, пошагово приготовить блюдо, вкусное блюдо, приготовить еду, кухни мира, кулинарные рецепты, вкусно, просто, по шагам, праздничное, с фото, preparing recipes, cook dish, delicious dishes`}
        robots="noindex"
        />                 
        <div className='wrapRecipes'>  
            <div className='headerRecipe'>              
                <div className='breadcrumbs text-center'>
                    <a href={`/recipes`}>РЕЦЕПТЫ</a>                    
                    <span> / <a href={`/recipes/${cat}`}>{typeRecipe}</a> / {subTypeRecipe}</span>                                           
                </div>
            </div>            
            <h2><span>{typeRecipe}</span>: {subTypeRecipe}</h2>
                    <div className="rowsRecipes">
                         {recipes && 
                            <>
                                 {recipes.map((recipe) => 
                                    <div key={recipe.id}>
                                        <img src={`/upload/${recipe.img_main}`} alt={recipe.name} loading="lazy"/>
                                        <span className='recipe_title'>
                                            <span className='type'>{recipe.type}</span>
                                            <span className='title'><a href={`/recipes/${cat}/${subtype}/${recipe.id}`}>{recipe.name}</a></span>        
                                            <span className='rating_stars_list'>      
                                                <span>             
                                                    <StarRating                    
                                                        count={5}
                                                        size = {24}
                                                        rating = {recipe.rating}
                                                    ></StarRating>  
                                                </span>   
                                            <span className='ratingList mr-l-20'>Рейтинг</span>
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

export default FoodCategory