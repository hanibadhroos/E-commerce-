import React, {useState, useEffect } from 'react';
import Toast from "../components/Toast";
import {useModal} from "../context/ModalContext";
import api from '../api/axios';
import { useParams } from "react-router-dom";


export default function SaveProduct(){

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [data, setData] = useState(null)

    const [successMessage, setSuccessMessage] = useState("");

    const {closeModal} = useModal();


    const { id } = useParams();


    const [variants, setVariants] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const res = await api.get(`/api/admin/cj-product/variants/${id}`);
            const p = res.data;
            console.log(p);
            // حوّلها إلى Array حقيقي
            const variantsArray = Array.isArray(p)? p : Object.values(p);
            setVariants(p);
            // setProduct(p);
    
            // بعد جلب المنتج فقط
            // setData({
            //   cj_product_id: p.productId,
            //   ar_name: "",
            //   en_name: p.nameEn,
            //   sku: p.sku,
            //   image: p.bigImage,
            //   price: p.sellPrice,
            //   weight: p.weight,
            //   pack_weight: p.packWeight,
            //   total_price: p.totalPrice,
            //   warehouse: p.defaultArea,
            //   country_code: p.areaCountryCode,
            //   cj_created_at: p.createAt,
            //   discountPrice: "",
            //   discription: "",
            //   vid: p.vid,
            // });
    
          } catch (err) {
            setError("Failed to load product");
          }
        };
    
        fetchProduct();
      }, [id]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSaving(true);
        
        try{
            if(data.total_price > product.totalPrice){
                const response = await api.post('/api/products', data);
                // onSuccess(response.data.data ?? response.data);
                // onShowToast("Product Saved success", "success", 3000);
    
                closeModal();
            }
            // else{
            //     // onShowToast('Price must be greater than Cj price', 'fail', 3000);
            // }
        }
        catch(e){
            console.error(e.message);
            setError(e.message);
            // onShowToast("Failed to save product", "error", 3000);

        }
        finally {
            setSaving(false);
        }

    }

    if (variants.length === 0) return <div>Loading...</div>;


    return (
        <div  className='layer'>
            <div>

            <div className="variants-grid">
                {variants.map(v => (
                    <div className="variant-card" key={v.vid}>

                    <div className="variant-image">
                        <img src={v.variantImage} alt={v.variantNameEn} />
                    </div>

                    <div className="variant-body">
                        <h5 className="variant-title">
                        {v.variantNameEn}
                        </h5>

                        <input type="text" placeholder="Name in Arabic:"/>
                        {/* <p className="variant-sku">
                        SKU: <span>{v.variantSku}</span>
                        </p> */}

                        <div className="variant-info">
                            <span>⚖️ {v.variantWeight} g</span>
                            <span> <i class="fa-solid fa-palette"></i>{v.variantKey.split('-',1)}</span>
                            <span> <i class="fa-solid fa-weight-scale"></i> {v.variantKey.split("-")[1]}</span>
                        </div>

                        <div className="variant-price">
                        {/* <small>CJ Suggested Price</small> */}
                        <strong>$ <input type="text" value={v.variantSugSellPrice}/> </strong>
                        </div>

                        <button className="btn btn-success w-100 mt-2">
                        اختيار هذا الإصدار
                        </button>
                    </div>

                    </div>
                ))}
                </div>



            </div>
        </div>
    )
}