import './styles-star-rating.css'


function StarRating ({count, size, activeColor = "rgb(211, 28, 3)", inactiveColor="rgba(0, 0, 0, 0.15)", rating}) 
    {

        const stars = Array.from ({length: count}, ()=>'★');
        
        return (
            <span className='ratingWrap'>
                {stars.map((s, index) => {
                    let style = inactiveColor;
                    if (index < rating) {
                    style=activeColor;
                    }
                    return (
                        <span className={"star"}  
                            key={index}
                            style={{color: style, width:size, height:size, fontSize: size}}
                        >{s}</span>
                    )
                })}
            <a href="#reviews">{rating}</a>   
            </span>
        )    
    }


export default StarRating;