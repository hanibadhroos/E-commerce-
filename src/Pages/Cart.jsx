import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function Cart(){


    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getTotalPrice, 
        getTotalItems 
    } = useCart();


    const {t, i18n} = useTranslation();

    if (cartItems.length === 0) {
        return (
          <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <h1>Your Cart is Empty</h1>
            <p>Add some products to your cart!</p>
            <Link to="/" style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block',
              marginTop: '20px'
            }}>
              Continue Shopping
            </Link>
          </div>
        );
    }


    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <h1>Shopping Cart ({getTotalItems()} items)</h1>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* قائمة المنتجات */}
            <div style={{ flex: 3, minWidth: '300px' }}>
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  style={{
                    backgroundColor: 'white',
                    padding: '15px',
                    marginBottom: '15px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                >
                <img 
                    src={item.image} 
                    alt={item.title}
                    style={{ 
                        width: '100px', 
                        height: '100px', 
                        objectFit: 'contain',
                        marginRight: '20px'
                    }}
                />
                  
                  <div style={{ flex: 1 }}>
                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                      <h3 style={{ margin: '0 0 10px 0' }}>{item.title}</h3>
                    </Link>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div>
                        <strong style={{ color: '#4CAF50', fontSize: '18px' }}>
                          ${item.price}
                        </strong>
                      </div>
                      
                      <div>
                        <label>{t("quantity")}: </label>
                        <input 
                          type="number" 
                          min="1" 
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          style={{ 
                            width: '60px',
                            padding: '5px',
                            marginLeft: '10px'
                          }}
                        />
                      </div>
                      
                      <div>
                        <strong>{t("total")}: ${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginLeft: '20px'
                    }}
                  >
                    {t("remove")}
                    {/* {t("all")} */}
                  </button>
                </div>
              ))}
            </div>
            
            {/* ملخص الطلب */}
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <h2>{t("order_summary")}</h2>
                
                <div style={{ margin: '20px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>{t("subtotal")} ({getTotalItems()} {t("items")})</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>{t("shopping")}</span>
                    <span>{t("free")}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>{t("tax")}</span>
                    <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <hr style={{ margin: '20px 0' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
                    <span>{t("total")}</span>
                    <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '15px',
                    width: '100%',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginBottom: '10px'
                  }}
                >
                  {t("proceed_to_checkout")}
                </button>
                
                <button 
                  onClick={clearCart}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {t("clear_cart")}
                </button>
                
                <Link to="/" style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '15px',
                  color: '#2196F3',
                  textDecoration: 'none'
                }}>
                  {t("continoue_to_shop")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );

    
}