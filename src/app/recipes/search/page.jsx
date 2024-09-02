"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Meta from '@/app/components/meta/page';

const SearchRecipes = () => {

    const path = process.env.PATH_API; 
    const searchParams = useSearchParams();
    const search = searchParams.get('state');
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
                const res = await fetch(`${path}cooking/search?type=kitchen&search=${search}`, {
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
                const res = await fetch(`${path}cooking/search?type=main&search=${search}`, {
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
                const res = await fetch(`${path}cooking/search?type=soup&search=${search}`, {
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
                const res = await fetch(`${path}cooking/search?type=salad&search=${search}`, {
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
                const res = await fetch(`${path}cooking/search?type=second&search=${search}`, {
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
                const res = await fetch(`${path}cooking/search?type=pelmeni&search=${search}`, {
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
                const res = await fetch(`${path}cooking/search?type=snacks&search=${search}`, {
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
                const res = await fetch(`${path}cooking/search?type=dough&search=${search}`, {
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
                const res = await fetch(`${path}cooking/search?type=drink&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchDrink(data); 
                }).catch((err) => {
                    console.log(err);
                });
              }
            getDrink();
       
    }, [search])
 

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
    <div>
        <Meta robots="noindex"/> 
        <div className='wrapRecipes'>  
            <div className='headerRecipe'>  
                <h2>Найденные рецепты</h2>
                <div className="rowsRecipes">
                    {recipesAll && 
                        <>
                            {recipesAll.map((recipe, index) => 
                                <div key={recipe.id}>
                                    <img src={`/upload/${recipe.img_main}`} alt={recipe.name}/>
                                    {/* <span className='type'>{recipe.type}</span> */}
                                    <span className='recipe_title'>
                                        <span className='type'>{recipe.type}</span>
                                        <span className='title'><Link href={`../recipes/${recipe.section}/${recipe.type}/${recipe.id}`}>{recipe.name}</Link> </span>                        
                                        <span className='rating_stars'>★★★★★ <span className='rating'>Рейтинг</span></span>                        
                                    </span>
                                </div>
                            )}                
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchRecipes