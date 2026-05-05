import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function ProductDetails(){
    const { id } = useParams(); // ملاحظة: الرابط هو /product/:id وليس productId
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {t, i18n} =useTranslation();

    const {addToCart} = useCart();
    const {showToast} = useToast();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // استخدم المعلمة id من useParams
                // const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                const response = await api.get(`api/products/${id}`);
                console.log(response);
                setProduct(response.data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]); 

    const handleAddToCart = (e, variant)=>{
        e.preventDefault();
        e.stopPropagation();
        addToCart(variant.product, variant);
        showToast(t('added_to_cart'));
    }

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }


    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    {/* صورة المنتج */}
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <img 
                            src={product.image} 
                            alt={product.title}
                            style={{ 
                                width: '100%', 
                                maxHeight: '500px',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                    
                    {/* تفاصيل المنتج */}
                    <div style={{ flex: '2', minWidth: '300px' }}>
                        
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <div style={{ 
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                marginRight: '10px',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }}>
                                ${product.sale_price}
                            </div>
                            
                            <div style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#FFD700',
                                color: 'black',
                                padding: '5px 10px',
                                borderRadius: '5px'
                            }}>
                                <span style={{ marginRight: '5px' }}>⭐</span>
                                <span>{product.rating?.rate || 'N/A'}</span>
                                <span style={{ marginLeft: '5px', fontSize: '12px' }}>
                                    ({product.rating?.count || 0} {t("reviews")})
                                </span>
                            </div>
                        </div>
                        
                        <div style={{ 
                            backgroundColor: '#f9f9f9',
                            padding: '15px',
                            borderRadius: '5px',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{ marginBottom: '10px' }}>{t("product_name")}</h3>
                            <p style={{ lineHeight: '1.6', color: '#666' }}>
                                {product.product.ar_name}
                            </p>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ marginBottom: '10px' }}>{t('attributes')}</h3>
                            <span style={{
                                backgroundColor: '#e0e0e0',
                                padding: '5px 15px',
                                borderRadius: '20px',
                                fontSize: '14px'
                            }}>
                                {product.attributes}
                            </span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                            <button style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                padding: '15px 30px',
                                borderRadius: '5px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                flex: '1'
                            }}
                                onClick={(e)=> handleAddToCart(e, product)}
                            >
                                <i className="fas fa-cart-plus"></i>
                            </button>
                            
                            <Link style={{
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                padding: '15px 30px',
                                borderRadius: '5px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                flex: '1'
                            }}
                            to={'/payment'}
                            >
                                {t("buy_now")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}