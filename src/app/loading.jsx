export default function Loading({type}) {
    return (        
    
        //<Loading type={"l"}/> 
        //<Loading type={"m"}/>
        //<Loading type={"s"}/>

        <>
            {type==="l" &&
                <img src="/img/spin.gif" loading="lazy"></img>
            }
            {type==="s" &&
                <img src="/img/spin-s.gif" loading="lazy"></img>
            }
            {type==="m" &&
                <img src="/img/spin-m.gif" loading="lazy"></img>
            }
        </>
    )
}


