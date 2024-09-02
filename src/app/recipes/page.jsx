"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StarRating from '@/app/components/star_rating/page';
import Meta from '../components/meta/page';


const AllRecipes = () => {
    const currentUrl = usePathname();
    const path = process.env.PATH_API; 
    const [recipesAll, setRecipesAll] = useState([]);  
    const [searchKitchen, setSearchKitchen] = useState([]);
    const [searchMain, setSearchMain] = useState([]);
    const [searchSoup, setSearchSoup] = useState([]);
    const [searchSecond, setSearchSecond] = useState([]);
    const [searchSalad, setSearchSalad] = useState([]);
    const [searchPelmeni, setSearchPelmeni] = useState([]);
    const [searchSnacks, setSearchSnacks] = useState([]);
    const [searchDough, setSearchDough] = useState([]);
    const [searchDrink, setSearchDrink] = useState([]);

    useEffect (() =>
    {  
            async function getKitchen() {
                const res = await fetch(`${path}cooking/recipes?type=kitchen`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchKitchen(data);
                }).catch((err) => {
                    console.log(err);
                });
              }
            getKitchen();    
            
            async function getMain() {
                const res = await fetch(`${path}cooking/recipes?type=main`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchMain(data);
                }).catch((err) => {
                    console.log(err);
                });
              }
            getMain();
            async function getSoup() {
                const res = await fetch(`${path}cooking/recipes?type=soup`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchSoup(data); 
                }).catch((err) => {
                    console.log(err);
                });
              }
            getSoup();

            async function getSalad() {
                const res = await fetch(`${path}cooking/recipes?type=salad`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchSalad(data); 
                }).catch((err) => {
                    console.log(err);
                });
              }
            getSalad();

            async function getSecond() {
                const res = await fetch(`${path}cooking/recipes?type=second`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchSecond(data); 
                }).catch((err) => {
                    console.log(err);
                });
              }
            getSecond();
            async function getPelmeni() {
                const res = await fetch(`${path}cooking/recipes?type=pelmeni`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchPelmeni(data); 
                }).catch((err) => {
                    console.log(err);
                });
              }
            getPelmeni();
            async function getSnacks() {
                const res = await fetch(`${path}cooking/recipes?type=snacks`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchSnacks(data); 
                }).catch((err) => {
                    console.log(err);
                });
              }
            getSnacks();
            async function getDough() {
                const res = await fetch(`${path}cooking/recipes?type=dough`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchDough(data); 
                }).catch((err) => {
                    console.log(err);
                });
              }
            getDough();
            async function getDrink() {
                const res = await fetch(`${path}cooking/recipes?type=drink`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchDrink(data); 
                }).catch((err) => {
                    console.log(err);
                });
              }
            getDrink(); 

    }, [currentUrl])


    useEffect(() => {        
        const array = [];
        const arrRecipesKitchen = searchKitchen.map(obj => ({ ...obj, section: 'kitchen' }));
        const arrRecipesMain = searchMain.map(obj => ({ ...obj, section: 'main' }));
        const arrRecipesSoup = searchSoup.map(obj => ({ ...obj, section: 'soup' }));
        const arrRecipesSecond = searchSecond.map(obj => ({ ...obj, section: 'second' }));
        const arrRecipesSalad = searchSalad.map(obj => ({ ...obj, section: 'salad' }));
        const arrRecipesPelmeni = searchPelmeni.map(obj => ({ ...obj, section: 'pelmeni' }));
        const arrRecipesDough = searchDough.map(obj => ({ ...obj, section: 'dough' }));
        const arrRecipesSnack = searchSnacks.map(obj => ({ ...obj, section: 'snacks' }));
        const arrRecipesDrink = searchDrink.map(obj => ({ ...obj, section: 'drink' }));
        Array.prototype.push.apply(array, arrRecipesKitchen);
        Array.prototype.push.apply(array, arrRecipesMain);
        Array.prototype.push.apply(array, arrRecipesSoup);
        Array.prototype.push.apply(array, arrRecipesSecond);
        Array.prototype.push.apply(array, arrRecipesSalad);
        Array.prototype.push.apply(array, arrRecipesPelmeni);
        Array.prototype.push.apply(array, arrRecipesDough);
        Array.prototype.push.apply(array, arrRecipesSnack);
        Array.prototype.push.apply(array, arrRecipesDrink);
        setRecipesAll (array);
    }
    , [searchKitchen, searchMain, searchSoup, searchSecond, searchSalad, searchPelmeni, searchDough, searchSnacks, searchDrink]);



  return (
        <div className='wrapRecipes'>      
            <Meta
                title="все рецепты приготовления вкусных блюд list all recipes delicious dish" 
                description="все рецепты приготовления вкусных блюд all recipes preparing delicious dishes" 
                keywords="список рецептов, разные рецепты, блюда мира, вкусные блюда, приготовить еду, кулинарные рецепты, вкусно, просто, по шагам, праздничное, с фото, preparing cook dish, recipe, tasty dishes" 
                robots="noindex"
            />
            <div className='headerRecipe'>  
                <h2>Все рецепты</h2>                
                <div className="rowsRecipes">
                    {recipesAll && 
                        <>
                            {recipesAll.map((recipe, index) => 
                                <div key={index}>
                                    <img src={`/upload/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    {/* <span className='type'>{recipe.type}</span> */}
                                    <span className='recipe_title'>
                                        <span className='type'>{recipe.type}</span>
                                        <span className='title'><Link href={`../recipes/${recipe.section}/${recipe.type}/${recipe.id}`}>{recipe.name}</Link> </span>                        
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

export default AllRecipes