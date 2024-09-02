import { useState } from 'react';
import './styles-choice-star-rating.css'


function ChoiсeStarRating ({rightBlock, count, size, activeColor = "rgb(211, 28, 3)", inactiveColor="rgba(0, 0, 0, 0.15)", onChange, rating}) 
    {
        const stars = Array.from ({length: count}, ()=>'★');        
        const handleChange = (value) => {
            onChange(value+1);
          }

        return (
            <span className='ratingWrap' type='button' onClick={(e)=>{e.preventDefault()}}>
                {stars.map((s, index) => {
                    let style = inactiveColor;
                    if (index < rating) {
                    style=activeColor;
                    }
                    return (
                    <span type='button' className={"star"}  
                        key={index}
                        style={{color: style, width:size, height:size, fontSize: size}}
                        onClick={(e)=>{e.preventDefault(); handleChange(index)}}>{s}
                    </span>
                    )
                })}
                {rightBlock && <>
                    <span className='ratingBorderr'></span>
                    <span className='rating'>
                        {rating===1 && <span data-rating={rating}>Не буду это готовить</span>}     
                        {rating===2 && <span data-rating={rating}>Не очень понравилось</span>}  
                        {rating===3 && <span data-rating={rating}>Не плохой рецепт</span>}  
                        {rating===4 && <span data-rating={rating}>Вкусно</span>}  
                        {rating===5 && <span data-rating={rating}>Восхитительно</span>}  
                    <span/></span>
                    </>
                }
            </span>
        )    
    }


export default ChoiсeStarRating;