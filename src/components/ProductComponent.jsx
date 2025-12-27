import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";


export default function ProductComponent({product}){

    

    const {addToCart} = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    const handleAddToCart = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        alert(`${product.title} added to cart`);
    }


    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const wasAdded = toggleFavorite(product);
        e.currentTarget.blur();

    };


    const favorite = isFavorite(product.id);


    return(
        <div 
            key={product.id} 
            style={{
                backgroundColor: 'rgb(44 44 44 / 0%)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s',
                cursor: 'pointer',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            >
            <div style={{ 
                height: '200px', 
                overflow: 'hidden',
                borderRadius: '8px',
                marginBottom: '15px'
            }}>
            <img 
            className="product-img"
            src={product.image} 
            alt={product.title} 
            style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                backgroundColor: 'white'
            }}
            />
        </div>
        <h3 style={{ 
            fontSize: '16px', 
            marginBottom: '10px',
            height: '40px',
            overflow: 'hidden'
        }}>
            {product.title}
        </h3>
        <p style={{ 
            fontSize: '20px', 
            color: '#4CAF50', 
            fontWeight: 'bold',
            marginBottom: '10px'
        }}>
            ${product.price}
        </p>
        <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: '10px'
        }}>
            <span style={{ 
            backgroundColor: product.rating.rate > 4 ? '#4CAF50' : 
                            product.rating.rate > 3 ? '#FFC107' : '#f44336',
            color: 'white',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            marginRight: '10px'
            }}>
            ⭐ {product.rating.rate}
            </span>
            <span style={{ fontSize: '14px', color: '#aaa' }}>
            ({product.rating.count} reviews)
            </span>
        </div>

        <div className="actions" style={{width:'300px',display:'flex', justifyContent:'space-around'}}>
            <button 
                style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                // width: '100%',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>

            <button onClick={handleToggleFavorite}><i className="fa-solid fa-heart" style={{color: favorite? 'red' : 'black'}}></i></button>

            <button><i className="fa-solid fa-edit"></i></button>
        </div>

        </div>
    )
}