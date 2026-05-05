import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from "./../api/axios";
import SaveProductForm from './SaveProduct';
import {useModal} from '../context/ModalContext';
import Toast from "../components/Toast";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function MyProducts(){

    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateStatus, setUpdateStatus] = useState({});
    const [myStoredProducts, setMyStoredProducts] = useState([]);
    const [arabicNames, setArabicNames] = useState({});
    const [arabicDescriptions, setArabicDescriptions] = useState({});
    const [savingId, setSavingId] = useState(null);
    const { cjToken} = useSelector((state)=> state.auth);
    const { openModal } = useModal();

    

    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "success", duration = 3000) => {
        const id = Date.now(); // معرف فريد
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };
    useEffect(()=>{
        const fetchMyProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/admin/cj-my-products');
                
                // افترض أن البيانات في response.data.data أو response.data
                setMyProducts( Array.isArray(response.data)? response.data : [] );
            } catch (err) {
                setError(err.message || 'حدث خطأ في جلب البيانات');
                console.error('خطأ في جلب المنتجات:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyProducts();
    },[])

    useEffect(() => {
        const fetchStoredProducts = async () => {
            try {
                const response = await api.get('/api/products');
                setMyStoredProducts(response.data.data || response.data || []);
            } catch (err) {
                setError(err.message || 'خطأ في جلب المنتجات المخزنة');
            }
        };
    
        fetchStoredProducts();
    }, []);

    /////Check updates.
    // useEffect(()=>{
    //     const checkUpdates = async () => {
    //         let status = {};

    //         const requests = myProducts.map(product => {
    //             const stored = myStoredProducts.find(
    //                 p => p.cj_product_id == product.productId
    //             );

    //         if (!stored) return null;

    //         return api
    //             .get(`/api/admin/cj/product-details/${product.productId}`)
    //             .then(res => ({
    //                 productId: product.productId,
    //                 storedCount: stored.variants?.length || 0,
    //                 cjCount: res.data.data.variants?.length || 0
    //             }))
    //             .catch(() => ({
    //                 productId: product.productId,
    //                 error: true
    //             }));
    //     });

    //     const results = await Promise.all(requests.filter(Boolean));

    //     results.forEach(r => {
    //         if (r.error) {
    //             status[r.productId] = false;
    //         } else {
    //             status[r.productId] = r.storedCount < r.cjCount;
    //         }
    //     });

    //     setUpdateStatus(status);
    // };
    //     if (myProducts.length && myStoredProducts.length) {
    //         checkUpdates();
    //     }
    // }, [myProducts, myStoredProducts]); 

    if (loading) return <div>جاري تحميل المنتجات...</div>;
    if (error) return <div>خطأ: {error}</div>;

    
    const isAdded = (productId) => {
        return myStoredProducts.some(
            stored => stored.cj_product_id === productId
        );
    };

    const handleArabicNameChange = (productId, value) => {
        setArabicNames(prev => ({
            ...prev,
            [productId]: value
        }));
    };

    const handleArabicDescriptionChange = (productId, value) => {
        setArabicDescriptions(prev => ({
            ...prev,
            [productId]: value
        }));
    };
    

    const handleAddProduct = async (product) => {
        setSavingId(product.productId);

        const arName = arabicNames[product.productId];
        const arDescription = arabicDescriptions[product.productId];

        if (!arName) {
            showToast("الرجاء إدخال اسم المنتج بالعربي", "error");
            setSavingId(null);
            return;
        }
    
        if (!arDescription) {
            showToast("الرجاء إدخال وصف المنتج بالعربي", "error");
            setSavingId(null);
            return;
        }

        try {

            const res = await api.get(`/api/admin/cj/product-details/${product.productId}`);
            // console.log(res.data.data.variants);
            const variants = res.data.data.variants || [];
            
            const formattedVariants = variants.map(v => {

                const totalStock = v.inventories?.reduce((sum, inv) => {
                    return sum + (inv.totalInventory || 0);
                }, 0);
            
                return {
                    vid: v.vid,
                    variantSellPrice: v.variantSellPrice,
                    variantSku: v.variantSku,
                    variantImage: v.variantImage,
                    stock: totalStock,
                    attributes: v.variantKey || null   // ← مهم جدًا
                };
            });


            await api.post('/api/admin/cj-save', {
                cj_product_id: product.productId,
                ar_name: arName,
                en_name: product.nameEn,
                image: product.bigImage,
                description_ar: arDescription,
                variants: formattedVariants,
            });
    
            showToast("تم حفظ المنتج بنجاح");
    
            setMyStoredProducts(prev => [
                ...prev,
                { 
                    cj_product_id: product.productId,
                    variants: formattedVariants
                }
            ]);
    
        } catch (error) {
            showToast("حدث خطأ أثناء الحفظ" + error, "error");
            console.error(error)
        }
        finally{
            setSavingId(null);
        }
    };
    
    
    // const storedProductIds = new Set(
    //     myStoredProducts.map(p => p.productId)
    // );
    
    // const isAdded = (id) => storedProductIds.has(id);
    

    return (
        <div>
            
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}

            <div className="row m-0" >
                {/* Products Summary */}
                <div className="container">
                <div className="row">
                    {myProducts.length > 0 ? (
                        myProducts.map(product => {
                            const added = isAdded(product.productId);
                            
                            return (
                                <div key={product.productId} className="col-md-4 mb-4">
                                    <div className="product-card position-relative h-100">

                                        
                                        <img
                                            src={product.bigImage || '/placeholder.jpg'}
                                            alt={product.nameEn}
                                            className="img-fluid"
                                        />

                                        <div className="p-3">
                                            <h6 className="fw-bold">{product.nameEn}</h6>
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                placeholder="اسم المنتج بالعربي"
                                                value={arabicNames[product.productId] || ""}
                                                onChange={(e) =>
                                                    handleArabicNameChange(product.productId, e.target.value)
                                                }
                                            />

                                            <textarea
                                                className="form-control mb-2"
                                                placeholder="وصف المنتج بالعربي"
                                                value={arabicDescriptions[product.productId] || ""}
                                                onChange={(e) =>
                                                    handleArabicDescriptionChange(product.productId, e.target.value)
                                                }
                                            />
                                            <p className="mb-1">السعر: ${product.sellPrice}</p>
                                            {/* <p className="mb-1">SKU: {product.sku}</p>
                                            <p className="mb-1">السعر: ${product.sellPrice}</p>
                                            <p className="mb-3">الوزن: {product.weight}g</p> */}

                                            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                                                <button
                                                    className={`btn  ${added ? 'btn-secondary' : 'btn-success'}`}
                                                    disabled={
                                                        added ||
                                                        savingId === product.productId ||
                                                        !arabicNames[product.productId] ||
                                                        !arabicDescriptions[product.productId]
                                                    }
                                                    onClick={() => handleAddProduct(product)}
                                                >
                                                    {savingId === product.productId? 'Saving...' : added? 'Added' : 'Add'}
                                                </button>
                                                {/* For update cj product */}
                                                {/* <button
                                                    className='btn btn-success'
                                                    disabled={!updateStatus[product.productId]}
                                                >
                                                    update
                                                </button> */}
                                            </div>
                                                
                                            

                                        </div>

                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center">
                            <h2>No Products</h2>
                        </div>
                    )}
                </div>
                </div>                
            </div>
        </div>
    )
}