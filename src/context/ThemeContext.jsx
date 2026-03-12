import { createContext } from "react";
import { useContext,useState } from "react";
export const ThemeContext =createContext();
export const ThemeProvider =({children})=>{
    const [Mtheme,setMTheme] =useState({bg:'rgba(255,255,255,1)',fg:'rgba(44,44,44,1)'});
    const toggleMTheme=()=>{
        if(Mtheme.bg==='rgba(255,255,255,1)'){
            setMTheme({bg:'rgba(44,44,44,1)',fg:'rgba(255,255,255,1)'});
        }else 
            setMTheme({bg:'rgba(255,255,255,1)',fg:'rgba(44,44,44,1)'});
    };
    return(
        <ThemeContext.Provider
            value={{
                toggleMTheme,
                Mtheme,
            }}>
            {children}
        </ThemeContext.Provider>
    );

}