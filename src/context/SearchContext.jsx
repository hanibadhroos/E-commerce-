import React, {useState, createContext, useContext, Children} from "react";

const SearchContext = createContext();

export const SearchProvider = ({children})=>{

    const [query, setQuery] = useState("");

    return (
        <SearchContext.Provider value={{query, setQuery}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = ()=> useContext(SearchContext);