import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductComponent from "../components/ProductComponent";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useTranslation } from "react-i18next";
export default function Home(){

    const {t, i18n} = useTranslation();

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    const {query} = useSearch();

    ////Get categories
    useEffect( ()=>{
        const fetchCategories = async ()=>{
            try{
                const response = await axios.get("https://fakestoreapi.com/products/categories");
                setCategories(response.data);
            }
            catch(e){
                console.error("Error fetching categories ", e);
            }
        }

        fetchCategories();
    }, []);

    ////Get products
    useEffect(()=>{
        const fetchProducts = async ()=>{
            setLoading(true);
            setError(null);
            try{
                let apiUrl = "https://fakestoreapi.com/products";

                if(selectedCategory !== "all"){
                    apiUrl = `https://fakestoreapi.com/products/category/${selectedCategory}`;
                }

                const response = await axios.get(apiUrl);
                
                setProducts(response.data);
            }
            catch(e){
                setError(e.message);
                console.error("Error fetching products:", e);
            }
            finally {
                setLoading(false);
            }
        }

        fetchProducts();
    },[selectedCategory])


    const categoriesList = categories.map((c)=>{
        return (<option key={c} value={c} > 
                    {c}
                </option>)
        
    })


    const filteredProducts = products.filter((product)=>
        product.title.toLowerCase().includes(query.toLowerCase())
    )

    const featuredProducts = [...filteredProducts].sort((a, b) => b.rating.rate - a.rating.rate);

    return(
        <div style={{ minHeight:'100vh'}}>
            <div className="row fliters">
                <div >{t("all")}</div>
                <div >{t('top_rated')}</div>
                <div >{t('top_demand')}</div>
                <div >{t("might_interest_you")}</div>
            </div>

            {loading && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                <div style={{ color: '#4CAF50', fontSize: '18px' }}>
                    Loading products...
                </div>
                </div>
            )}

            {error && (
                <div style={{ color: '#ff6b6b', margin: '20px', textAlign: 'center' }}>
                Error: {error}
                </div>
            )}

            <div style={{display:'flex'}} className="content">
                {/* Products  */}
                <div className="products-container row w-100">
                {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                        <ProductComponent key={product.id} product={product}/>
                    ))
                ) : (
                !loading && !error && (
                    <div style={{ 
                    gridColumn: '1/-1', 
                    textAlign: 'center', 
                    color: '#aaa',
                    fontSize: '18px'
                    }}>
                    No products found
                    </div>
                )
                )}
                </div>

                {/* Featured products */}
                <div className="categories m-2">
                    {!loading && !error? (
                            <div>
                                <ul>
                                    <li>جوالات سامسونج</li>
                                    <li>جوالات ايفون</li>
                                    <li>ساعات رقمية</li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                Loading...
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}