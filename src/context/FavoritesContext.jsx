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


    const addToFavorites = (product, variant)=>{
        
        const isAlreadyFavorite = favorites.some(fav=> fav.variant_id === variant.id);

        if (!isAlreadyFavorite) {
            const updatedFavorites = [...favorites, product];
            console.log(updatedFavorites);
            setFavorites(updatedFavorites);
            return true;
        }
        return false;

    };

    const removeFromFavorites = (variantId) => {
        console.log(variantId);
        const updatedFavorites = favorites.filter(fav => fav.variant_id !== variantId);
        console.log(updatedFavorites);
        setFavorites(updatedFavorites);
    };

    const toggleFavorite = (product, variant) => {
        const isAlreadyFavorite = favorites.some(fav => fav.variant_id === variant.id);
        if (isAlreadyFavorite) {
            removeFromFavorites(variant.id);
            return false; // تمت الإزالة
        } else {
            var updatedProduct = {
                'id': product.id,
                'variant_id': variant.id,
                'en_name': product.en_name,
                'ar_name': product.ar_name,
                'image': variant.image,
                'sale_price': variant.sale_price,
                'attributes': variant.attributes
            };

            // addToFavorites(product);
            addToFavorites(updatedProduct, variant);

            return true; // تمت الإضافة
        }
    };

    const isFavorite = (variantId) => {
        return favorites.some(fav => fav.variant_id === variantId);
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