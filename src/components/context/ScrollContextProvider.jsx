import { useState } from "react";
import { ScrollContext } from "./ScrollContext";


const ScrollContextProvider = ( {children} ) => {

    const [navLightened,setNavLightened] = useState(null);
    const [scrollRef,setScrollsRef] = useState(null);
    const [darkTheme,setDarkTheme] = useState(false);
    const [theme,setTheme] = useState( { whiteTheme: {color: '#222b45', background: '#fff'}, darkTheme: {color: '#fff', background: '#384f5f'}  } );

    return (
        <ScrollContext.Provider value = { {navLightened,setNavLightened, scrollRef,setScrollsRef,darkTheme,setDarkTheme,theme,setTheme} }>
            { children }
        </ScrollContext.Provider>
    );
};

export default ScrollContextProvider;