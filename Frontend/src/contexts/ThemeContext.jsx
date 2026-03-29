import { createContext, useEffect } from "react";
import { useContext,useState } from "react";
export const ThemeContext =createContext();
export const ThemeProvider =({children})=>{
    const [theme,setTheme] =useState("light");
    const toggleTheme=()=>{
        setTheme(theme==="light"?"dark":"light");

    };
    useEffect(()=>{
        if(theme==="dark")
            document.documentElement.classList.add("darkMode");
        else
            document.documentElement.classList.remove("darkMode");
    },[theme]);
    return(
        <ThemeContext.Provider
            value={{
                toggleTheme,
                theme,
            }}>
            {children}
        </ThemeContext.Provider>
    );

}