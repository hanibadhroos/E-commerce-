import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

export default function Favorites(){

    const { favorites, removeFromFavorites, isFavorite} = useFavorites();
    const {addToCart} = useCart();
    
    return (
        <div style={{width:'560px', margin:'auto'}}>
            {
                favorites.length > 0?(
                    favorites.map(item=> (
                        <div key={item.id} style={{borderRadius:'12px', display:'flex', justifyContent:'space-around', alignItems:'center', marginBottom:'10px', backgroundColor:'#DDD', padding:'8px'}}>
                            <img src={item.image} alt={item.title} width={100} height={100}  style={{ width:'20%'}}/>

                            <div>
                                <div>
                                    <h3>{item.title}</h3>
                                </div>

                                <div className="actions">
                                    <button className="btn btn-success" onClick={()=>addToCart(item, 1)}>Add to cart</button>
                                    <button className="btn btn-secondary m-2" onClick={()=>removeFromFavorites(item.id)}><i className={'fa-solid fa-heart'} style={{color:'red'}}></i></button>
                                </div>
                            </div>
                        </div>
                    ))
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