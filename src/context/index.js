"use client";
import { createContext, useEffect, useState, useContext } from "react";
export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => { 
    const [currentUser, setCurrentUser] = useState(null);


   
    useEffect(() => {
         const user = JSON.parse(localStorage.getItem("user")) || null;
         setCurrentUser (user);
         
    }, [])

    const [auth, setAuth] = useState ();
    const [authStatus, setAuthStatus] = useState ();
    const [status, setStatus] = useState (null);   // статус ответа при вводе логина и пароля
    //const [userEmail, setUserEmail] = useState ();

    const path = process.env.PATH_API; 

    const login = async (inputs) => {
        try {
            const res = await fetch(`${path}login`, {
                method: "POST",
                body: JSON.stringify(inputs),
            })
            return res.json()
            .then((data) => {
                
                // setUserEmail(data.email);
                setCurrentUser(data.email);
                
                const d = data;
                const dstr = JSON.stringify(d);
                const dobj = JSON.parse(dstr);
                setStatus(dobj.status);
            }).catch((err) => {                                
                    console.log("login error");              
            })
           } 
        catch (err) {
            console.log("err", err);  
           }
           try {
            const res = await fetch(`${path}login/auth`, {
                method: "GET",
            })
            return res.json()
        }       
            catch (err) {
                console.log("err", err);  
           }

    };

    const logout = async (inputs) => {
        try {
            const res = await fetch(`${path}login/logout`, {
                method: "GET",
            })
            .then((data) => {
                setCurrentUser(null);     
                setAuthStatus (401);
                setAuth (false);
                //setUserEmail(false);
            }) }       
            catch (err) {
                setAuthStatus (401);
                console.log("err", err);  
           }          
        
    }

    useEffect(() => async() => {
        localStorage.setItem("user", JSON.stringify(currentUser));   
        const authorization = async () => {
            try {
            const res = await fetch(`${path}login/auth`, {
                method: "GET",
                withCredentials: true
            })
            return res?.json().then((data) => {
                setAuthStatus (data.status);
                setCurrentUser (data.user);
                setAuth (data.text);
                console.log (data)
            }) 
        }       
            catch (err) {
                console.log("err", err);  
           }}
           authorization();
    }, [auth]);



    return (
        <AuthContext.Provider value={{auth, login, status, authStatus, currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );


};