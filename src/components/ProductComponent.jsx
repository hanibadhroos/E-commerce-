import React, { useEffect, useState, useMemo, useTransition } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from "../context/ToastContext";
import {useTranslation} from 'react-i18next';
import api from "../api/axios";

function ProductComponent({ product }){

    const {addToCart} = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const {showToast} = useToast();
    const {user, isAuthenticated, authReady } = useSelector((state)=> state.auth);
    
    const [variantArName, setVariantArName] = useState({});
    const [saving, setSaving] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [ratingLoading, setRatingLoading] = useState(false);


    const {t, i18n} = useTranslation();
    

    const handleAddToCart = (e, variant )=>{
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, variant);
        showToast(t("added_to_cart"),)
        // toast(`${product.ar_name} added to cart`);
    }


    const handleToggleFavorite = (e, product, variant) => {
        e.preventDefault();
        e.stopPropagation();
        const wasAdded = toggleFavorite(product, variant);
        e.currentTarget.blur();

    };

    

    const [variantIndex, setVariantIndex] = useState(0);
    const variants = useMemo(()=>product.variants || []);
    const currentVariant = variants[variantIndex];

    ////Set the first product's variant in variantArName.
    useEffect(() => {
        if (currentVariant) {
            setVariantArName({
                variantId: currentVariant.id,
                arName: currentVariant.arAttributes ?? ''
            });
        }
    }, [variantIndex]);

    // const favorite = isFavorite(currentVariant?.id)
    const favorite = useMemo(() => {
        return isFavorite(currentVariant?.id);
    }, [currentVariant, isFavorite]);

    useEffect(() => {
        if (product?.variants?.length) {
            setVariantIndex(0);
        }
    }, [product.id]);

    useEffect(() => {
        setRating(currentVariant?.user_rating || 0);
    }, [currentVariant?.id]);

    const handleNextVariant = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (variants.length === 0) return;
    
        setVariantIndex((prev) =>
            prev === variants.length - 1 ? 0 : prev + 1
        );

        ////Clear variantArName.
        setVariantArName({});

        ////Call isFavorite function.
        isFavorite(currentVariant?.id);
    };
    
    const handlePrevVariant = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (variants.length === 0) return;
    
        setVariantIndex((prev) =>
            prev === 0 ? variants.length - 1 : prev - 1
        );
        ////Clear variantArName.
        setVariantArName({});

        isFavorite(currentVariant?.id);
    };

    const handleSave = async (e, variant) => {
        e.preventDefault();
        e.stopPropagation();
        setSaving(true);

        try {
            const res = await api.put(`/api/admin/saveVarArName/${variant.id}`, {
                arName: variantArName.arName
            });

            console.log(res.data);
            showToast("تم الحفظ بنجاح");

        } catch (error) {
            console.error(error);
            showToast("حدث خطأ أثناء الحفظ");
        }
        finally{
            setSaving(false);
        }
    }

    const handleRate = async (value) => {

        if (!authReady) {
            showToast("جاري التحقق من تسجيل الدخول...");
            return;
        }

        if (!isAuthenticated) {
            showToast("يجب تسجيل الدخول أولاً");
            return;
        }

        setRating(value);
        setRatingLoading(true);

        try {
            await api.post(`/api/rate-product`, {
                variant_id: currentVariant.id,
                rating: value,
                // user_id: user.id
            });
            dispatch(fetchProducts());
            showToast("تم إضافة التقييم");

        } catch (error) {
            console.error(error);
            showToast("خطأ في التقييم");
        } finally {
            setRatingLoading(false);
        }
    };


    return(
        <div 
            className="product-component"
            key={product.id} 
            style={{
                backgroundColor: '#265757',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '20px',
                borderRadius: '10px',
                transition: 'transform 0.3s',
                cursor: 'pointer',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom:'10px'
            }}
            // onMouseEnter={(e) => {
            //     e.currentTarget.style.transform = 'translateY(-5px)';
            //     e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
            // }}
            // onMouseLeave={(e) => {
            //     e.currentTarget.style.transform = 'translateY(0)';
            //     e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            // }}
            >
            <div style={{ 
                height: '200px', 
                overflow: 'hidden',
                borderRadius: '8px',
                marginBottom: '15px'
            }}>
                <Link key={product.id} to={`product/${currentVariant.id}`} style={{textDecoration:'none',}}>

                    <img 
                        className="product-img"
                        src={currentVariant?.image || product.image} 
                        alt={product.en_name} 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                        }}
                     />

                </Link>
            </div>

            {/* Adding navigate buttons */}
            {variants.length > 1 &&(
                <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginTop: '10px'
                    }}>
                    <button onClick={(e) => handlePrevVariant(e)}>
                        ◀
                    </button>

                    <span style={{ fontSize: '12px' }}>
                        {variantIndex + 1} / {variants.length}
                    </span>

                    <button onClick={(e) => handleNextVariant(e)}>
                        ▶
                    </button>
                </div>
                )
            }

            <h3 style={{ 
                fontSize: '16px', 
                marginBottom: '10px',
                height: '40px',
                overflow: 'hidden'
            }}>
            {product.ar_name}
            </h3>
            <hr style={{backgroundColor:'white'}}/>
            <b>{currentVariant?.attributes}</b>
            <div style={{display: user?.role === 'admin' ? 'block' : 'none'}}>
                <hr />
                <input type="text" value={variantArName.arName || ""} onChange={(e)=>{setVariantArName(prev =>({...prev, arName: e.target.value}))}} placeholder="ادخل تفاصيل بالعربي"/>
                {/* Update btn */}
                <button style={{margin:'0px 8px',}} className={`save-btn ${saving ? 'saving' : ''}`}  disabled={saving || !variantArName.arName} onClick={(e)=>handleSave(e, currentVariant)}>
                    {saving ? (
                        <span className="spinner"></span>
                    ):(
                        <i className="fa-solid fa-save"></i>
                    )}
                </button>
            </div>
            <hr style={{backgroundColor:'white'}}/>


            <p style={{ 
                fontSize: '20px', 
                color: 'rgb(117 195 120)', 
                fontWeight: 'bold',
                marginBottom: '10px',
                backgroundColor: '#DDD',
            }}>
                ${currentVariant?.sale_price || product.price}
            </p>
 

        <div className="actions" style={{display:'flex', justifyContent:'space-evenly',}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                {/* ⭐ النجوم */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {!authReady ? (
                        <span>...</span>
                    ):([1, 2, 3, 4, 5].map((star) => (
                        <i
                            key={star}
                            className="fa-solid fa-star"
                            style={{
                                cursor: 'pointer',
                                color: (hover || rating) >= star ? '#FFD700' : '#ccc',
                                fontSize: '18px',
                                transition: '0.2s'
                            }}
                            onClick={() => handleRate(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        ></i>
                    )))}

                    {ratingLoading && <span className="spinner"></span>}
                </div>

                {/* ⭐ المتوسط + عدد التقييمات */}
                <div style={{ fontSize: '12px', color:currentVariant?.ratings_avg_rating >= 4 ? '#4CAF50' :currentVariant?.ratings_avg_rating >= 3 ? '#FFC107' :'#f44336', marginTop: '3px' }}>
                    

                    <div>
                        ⭐ {currentVariant?.ratings_avg_rating 
                            ? currentVariant.ratings_avg_rating.toFixed(1) 
                            : 0}
                    </div>

                    <div style={{ fontSize: '12px', color: '#aaa' }}>
                        ({currentVariant?.ratings_count || 0} تقييم)
                    </div>
                </div>

            </div>

            <button 
                style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s',
                marginRight:'9px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                onClick={(e)=>handleAddToCart(e, currentVariant)}
            >
                <i className="fas fa-cart-plus"></i>
            </button>
   
            <button onClick={(e)=> handleToggleFavorite(e, product, currentVariant)}><i className="fa-solid fa-heart" style={{color: favorite? 'red' : 'black'}}></i></button>

            {/* Delete btn */}
            <button style={{display: user?.role === 'admin' ? 'block' : 'none'}}>
                <i className="fa-solid fa-trash"></i>
            </button>


        </div>

        </div>
    )
}

export default React.memo(ProductComponent);