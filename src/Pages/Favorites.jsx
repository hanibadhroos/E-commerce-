import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import {useTranslation} from "react-i18next";
export default function Favorites(){

    const { favorites, removeFromFavorites, isFavorite} = useFavorites();
    const {addToCart} = useCart();
    const {t, i18n} = useTranslation();

    return (
        <div style={{width:'560px', margin:'auto'}}>
            {
                favorites.length > 0?(
                    favorites.map(item => {

                        const variant = {
                            id: item.variant_id,
                            en_name: item.en_name,
                            ar_name: item.ar_name,
                            sale_price: item.sale_price,
                            attributes: item.attributes,
                            image: item.image
                        };
                    
                        return (
                            <div
                                key={item.variant_id}
                                style={{
                                    borderRadius: '12px',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                    backgroundColor: '#DDD',
                                    padding: '8px'
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.en_name}
                                    style={{ width: '200px', height: '200px' }}
                                />
                    
                                <div>
                                    <h3>
                                        {i18n.language === "ar" ? item.ar_name : item.en_name}
                                    </h3>
                                    <hr />
                                    <b>{item.attributes}</b>
                                    <hr />
                    
                                    <div className="actions">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => addToCart(item, variant, 1)}
                                        >
                                            <i className="fas fa-cart-plus"></i>
                                        </button>
                    
                                        <button
                                            className="btn btn-secondary m-2"
                                            onClick={() => removeFromFavorites(item.variant_id)}
                                        >
                                            <i className="fa-solid fa-heart" style={{ color: 'red' }}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <h2>There are no Favorites</h2> 
                        <Link to="/">
                            Back to Home
                        </Link>
                    </div>
                )
            }
        </div>
    )
}