import React, { createContext, useContext, useState, useEffect } from 'react';


const FavoriteContext = createContext();

export const useFavorites = ()=>{
    return useContext(FavoriteContext);
}


export const FavoriteProvider = ({children}) => {

    const [favorites, setFavorites] = useState(()=>{
        const storedFavorites = localStorage.getItem('favorites');

        try{
            return storedFavorites? JSON.parse(storedFavorites) : [];
        }
        catch(error){
            console.error("Error parsing favorites:", error);
            return [];
        }
    });

    ////Set and add new product to favorites.
    useEffect(()=>{
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    const addToFavorites = (product)=>{
        
        const isAlreadyFavorite = favorites.some(fav=> fav.id === product.id);

        if (!isAlreadyFavorite) {
            const updatedFavorites = [...favorites, product];
            setFavorites(updatedFavorites);
            return true;
        }
        return false;

    };

    const removeFromFavorites = (productId) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== productId);
        setFavorites(updatedFavorites);
    };

    const toggleFavorite = (product) => {
        const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);
        
        if (isAlreadyFavorite) {
            removeFromFavorites(product.id);
            return false; // تمت الإزالة
        } else {
            addToFavorites(product);
            return true; // تمت الإضافة
        }
    };

    const isFavorite = (productId) => {
        return favorites.some(fav => fav.id === productId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length,
    };


    return(
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>
    )
}