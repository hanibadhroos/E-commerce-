import React, { useEffect } from "react";

export default function Favorites(){

    console.log('hh')
    var favorites=[];
    useEffect(()=>{
        favorites = JSON.parse(localStorage.getItem('favorites'));
        favorites??[];
    },[])

    return (
        <div>
            {
                favorites.length >=0?(
                    favorites.map(item=>{
                        <div>
                            <img src={item.image} alt={item.title} width={100} height={100} />

                            <div>
                                <h3>{item.title}</h3>
                            </div>
                        </div>
                    })
                ) : (
                    <div>
                
                    </div>
                )
            }
        </div>
    )
}