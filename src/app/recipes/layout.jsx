"use client";
import { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'


export default function RootLayout({ children }) {

const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true)
      },[])

  return (
      <>
        {isClient && 
            <>  
                <div>
                    <Navbar/>
                        {children}
                    <Footer/>   
                </div>   
            </>        
        }
    </>
  )
}
